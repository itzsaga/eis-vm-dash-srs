import React, { Component } from 'react';
import firebase from './firebase';

import Vm from './Vm';

import 'bulma/bulma.sass';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vm: '',
      os: '',
      user: '',
      client: '',
      vms: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const vmsRef = firebase.database().ref('vms');
    vmsRef.on('value', (snapshot) => {
      let vms = snapshot.val();
      let newState = [];
      for (let vm in vms) {
        newState.push({
          id: vm,
          vm: vms[vm].vm,
          os: vms[vm].os,
          user: vms[vm].user,
          client: vms[vm].client
        });
      }
      newState.sort((a, b) => {
        const x = a.vm.toLowerCase();
        const y = b.vm.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      })
      this.setState({
        vms: newState
      });
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const vmsRef = firebase.database().ref('vms');
    const vm = {
      vm: this.state.vm,
      os: this.state.os,
      user: this.state.user,
      client: this.state.client
    }
    vmsRef.push(vm);
    this.setState({
      vm: '',
      os: '',
      user: '',
      client: ''
    })
  }

  removeVm(vmId) {
    const vmRef = firebase.database().ref(`/vms/${vmId}`);
    vmRef.remove();
  }

  render() {
    const vmList = this.state.vms !== [] ? <Vm vms={this.state.vms} removeVm={this.removeVm} /> : <h1>There are no VMs in use right now!</h1>;
    return (
      <div>
        <h1>Use the following as an example for formatting purposes:</h1>
        <p>VPN1A - WIN7 - Seth - Xchange TeleLink.Net</p>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="vm" placeholder="Which VM is this?" onChange={this.handleChange} value={this.state.vm} />
          <input type="text" name="os" placeholder="What OS is this VM?" onChange={this.handleChange} value={this.state.os} />
          <input type="text" name="user" placeholder="Who are you?" onChange={this.handleChange} value={this.state.user} />
          <input type="text" name="client" placeholder="What client are you connecting to?" onChange={this.handleChange} value={this.state.client} />
          <button>Add VM</button>
        </form>
        {vmList}
      </div>
    );
  }
}

export default App;

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
      <div className="container">
        <div className="title">Equinox VPN VM Usage Dashboard</div>
          <div className="field is-horizontal">
            <div className="field">
              <div className="control">
                <div className="select">
                  <select onChange={this.handleChange} name="vm" value={this.state.vm}>
                    <option>Pick a VM</option>
                    <option>VPN1A</option>
                    <option>VPN1B</option>
                    <option>VPN1C</option>
                    <option>VPN2A</option>
                    <option>VPN2B</option>
                    <option>VPN2C</option>
                    <option>VPN3A</option>
                    <option>VPN3B</option>
                    <option>VPN3C</option>
                    <option>VPN3D</option>
                    <option>VPN3E</option>
                    <option>VPN3F</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <div className="select">
                  <select onChange={this.handleChange} name="os" value={this.state.os}>
                    <option>Pick the OS</option>
                    <option>WINXP</option>
                    <option>WIN7</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <div className="select">
                  <select onChange={this.handleChange} name="user" value={this.state.user}>
                    <option>Who are you?</option>
                    <option>Chris</option>
                    <option>Eric</option>
                    <option>Ernest</option>
                    <option>Joe</option>
                    <option>Kevin</option>
                    <option>Mitch</option>
                    <option>Renee</option>
                    <option>Seth</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input className="input" type="text" name="client" placeholder="What client are you connecting to?" onChange={this.handleChange} value={this.state.client} />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button onClick={this.handleSubmit} className="button is-success">Add VM</button>
              </div>
            </div>
          </div>
        </div>
        {vmList}
      </div>
    );
  }
}

export default App;

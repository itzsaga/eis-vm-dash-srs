import React, { Component } from 'react';
import firebase from './firebase';

import Vm from './Vm';

import 'bulma/bulma.sass';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vm: '',
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
      user: this.state.user,
      client: this.state.client
    }
    vmsRef.push(vm);
    this.setState({
      vm: '',
      client: ''
    })
  }

  removeVm(vmId) {
    const vmRef = firebase.database().ref(`/vms/${vmId}`);
    vmRef.remove();
  }

  render() {
    return (
      <div className="container">
      <br />
        <div className="title is-2">Equinox VPN VM Usage Dashboard</div>
        <div className="field is-horizontal">
          <div className="field">
            <div className="control">
              <div className="select">
                <select onChange={this.handleChange} name="vm" value={this.state.vm}>
                  <option>Pick a VM</option>
                  <option>VPN1A - WIN7</option>
                  <option>VPN1B - WINXP</option>
                  <option>VPN1C - WINXP</option>
                  <option>VPN2A - WIN7</option>
                  <option>VPN2B - WIN7</option>
                  <option>VPN2C - WIN7</option>
                  <option>VPN3A - WIN7</option>
                  <option>VPN3B - WINXP</option>
                  <option>VPN3C - WIN7</option>
                  <option>VPN3D - WINXP</option>
                  <option>VPN3E - WIN7</option>
                  <option>VPN3F - WIN7</option>
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
              <input className="input" type="text" name="client" placeholder="Who are you connecting to?" onChange={this.handleChange} value={this.state.client} />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button onClick={this.handleSubmit} className="button is-success">Add VM</button>
            </div>
          </div>
        </div>
      <Vm vms={this.state.vms} removeVm={this.removeVm} />
      </div>
    );
  }
}

export default App;

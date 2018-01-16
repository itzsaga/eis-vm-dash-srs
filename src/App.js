import React, { Component } from 'react';
import firebase from './firebase';

import Vm from './Vm';

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

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="vm" placeholder="Which VM is this?" onChange={this.handleChange} value={this.state.vm} />
          <input type="text" name="os" placeholder="What OS is this VM?" onChange={this.handleChange} value={this.state.os} />
          <input type="text" name="user" placeholder="Who are you?" onChange={this.handleChange} value={this.state.user} />
          <input type="text" name="client" placeholder="What client are you connecting to?" onChange={this.handleChange} value={this.state.client} />
          <button>Add VM</button>
        </form>
        <Vm />
      </div>
    );
  }
}

export default App;

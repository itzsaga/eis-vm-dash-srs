import React from 'react';

const Vm = ({ vms, removeVm }) => (
  <ul>
    {vms.map((vm) => {
      return(
        <li key={vm.id}>
          <h3>{vm.vm} - {vm.os} - {vm.user} - {vm.client} <button className="button is-danger"onClick={() => removeVm(vm.id)}>X</button></h3>
        </li>
      )
    })}
  </ul>
);

export default Vm;

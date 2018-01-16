import React from 'react';

const Vm = ({ vms, removeVm }) => (
  <ul>
    {vms.map((vm) => {
      return(
        <li key={vm.id}>
          <h3>{vm.vm} - {vm.os} - {vm.user} - {vm.client} <button onClick={() => removeVm(vm.id)}>Remove VM</button></h3>
        </li>
      )
    })}
  </ul>
);

export default Vm;

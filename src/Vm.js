import React from 'react';

const Vm = ({ vms }) => (
  <ul>
    {vms.map((vm) => {
      return(
        <li key={vm.id}>
          <h3>{vm.vm} - {vm.os} - {vm.user} - {vm.client}</h3>
        </li>
      )
    })}
  </ul>
);

export default Vm;

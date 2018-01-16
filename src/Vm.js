import React from 'react';

const Vm = ({ vms, removeVm }) => (
  <div className="container">
    <div className="content">
      <ul>
        {vms.map((vm) => {
          return(
            <li key={vm.id}>
              <h3>{vm.vm} - {vm.os} - {vm.user} - {vm.client} <button className="button is-danger" onClick={() => removeVm(vm.id)}>Remove</button></h3>
            </li>
          )
        })}
      </ul>
    </div>
  </div>
);

export default Vm;

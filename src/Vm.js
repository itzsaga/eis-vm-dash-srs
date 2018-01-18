import React from 'react';

const Vm = ({ vms, removeVm }) => (
  <div className="container">
    <div className="content">
      <ul>
        {vms.map((vm) => {
          return(
            <li className="title" key={vm.id}>
              <p className="title">{vm.vm} - {vm.user} - {vm.client} <button className="button is-danger" onClick={() => removeVm(vm.id)}>Remove</button></p>
            </li>
          )
        })}
      </ul>
    </div>
  </div>
);

export default Vm;

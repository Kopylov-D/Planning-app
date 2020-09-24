import React from 'react';

export default function Stat({allTasks, doneTasks}) {
  const proportion = Math.ceil((doneTasks / allTasks) * 100);
  let classn = 'm-1 p-1';
  if (allTasks === doneTasks && allTasks > 0) {
    classn = `${classn} text-success`;
  }
  return (
    <table className=" table stat row ml-0 mr-0 mb-0 justify-content-center">
      <thead>
        <tr>
          <th scope="col" className={classn}>
            Выполнено: {doneTasks}/{allTasks}
          </th>
          <th scope="col" className={classn}>
            ({proportion > 0 && proportion !== Infinity ? proportion : 0}%)
          </th>
        </tr>
      </thead>
    </table>
  );
}

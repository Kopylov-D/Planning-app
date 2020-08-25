import React from 'react';

export default function Stat({allTasks, doneTasks}) {
  const proportion = Math.ceil((doneTasks / allTasks) * 100);
  return (
    <table className=" table stat row ml-0 mr-0 mb-0 justify-content-center">
      <thead>
        <tr>
          <th scope="col" className="m-1 p-1">
            Всего: {allTasks}
          </th>
          <th scope="col" className="m-1 p-1">
            Выполнено: {doneTasks}
          </th>
          <th scope="col" className="m-1 p-1">
            Доля выполненного:{' '}
            {proportion > 0 && proportion !== Infinity ? proportion : 0}%
          </th>
        </tr>
      </thead>
    </table>
  );
}

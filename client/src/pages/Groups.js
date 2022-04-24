import { gql, useApolloClient } from '@apollo/client';
import React, { useState } from 'react';

function Groups() {
  const client = useApolloClient();

  const [groupList, setGroupList] = useState([]);

  client
    .query({
      query: gql`
        query {
          groups {
            avatar
            name
          }
        }
      `,
    })
    .then((result) => {
      setGroupList(result.data.groups);
    });

  return (
    <div>
      {groupList.map((group) => (
        <div>
          <a href={`/group/${group.name}`}>{group.name}</a>
        </div>
      ))}
    </div>
  );
}

export default Groups;

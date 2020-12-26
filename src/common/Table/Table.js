import { entryAttr } from "../../catalog/constants"

const Table = props => {
	const { 
    paginatedEntries
  } = props;

	
	return (
		<div className={`table-result`}>
      <table>
        <thead>
          <tr>
            {Object.keys(entryAttr).map((attr, i) => (
              <th key={`heading-${i}`}>{attr}</th>
            ))}
          </tr>
        </thead>
          
        <tbody>
          {paginatedEntries.map(entry => {
            return (
              <tr key={`row-${entry.id}`}>
                {Object.keys(entryAttr).map((attr, k) => (
                  <td key={`col-${entry.id}-${k}`}>{entry[attr]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
		</div>
	);
};

export default Table
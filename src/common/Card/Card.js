import CardContent from "./CardContent";
import CardFooter from "./CardFooter";

import "./card.css"

const Card = props => {
	const { 
    name,
    owner,
    tags,
    rows,
    description,
    columns,
    table,
  } = props;

	
	return (
		<div className={`card result-card`}>
			<CardContent title={name} content={description} />
			<CardFooter rows={rows} columns = {columns} owner={owner} tag1 = {tags} tag2 = {table} />
		</div>
	);
};

export default Card
const CardContent = ({ title, content }) => {
	return (
		<div className="card-content">
			<h2>{ title }</h2>
			<p>{ content }</p>
		</div>
	);
};

export default CardContent;
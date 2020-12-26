const CardFooter = ({ rows, columns, owner, tag1, tag2 }) => {
	return (
		<div className="card-footer">
			<div className = "tags-wrapper">
				<span className="tag">{ tag1 } </span>
				<span className="tag">{ tag2 } </span>
			</div>

			<div className = "card-owner">
				<p>
					<span>
					{ owner } - Owner
					</span>
				</p>
			</div>

			<div className="info-wrapper">
				<span className="info-wrapper-rows">
					<b>{ rows }</b> rows
				</span>

				<span className="info-wrapper-column">
					<b>{ columns }</b> columns
				</span>
			</div>
		</div>
	);
};

export default CardFooter
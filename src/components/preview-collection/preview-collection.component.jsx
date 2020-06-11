import React from 'react';
import CollectionItem from '../collection-item/collection-item.component';
import './preview-collection.styles.scss';

const PreviewCollection = ({ title, items }) => (
	<div className='preview-collection'>
		<h1 className='title'>{title.toUpperCase()}</h1>
		<div className='preview'>
			{items
				.filter((item, index) => index < 4)
				.map(({ id, ...itemProps }) => (
					<CollectionItem key={id} {...itemProps} />
				))}
		</div>
	</div>
);

export default PreviewCollection;

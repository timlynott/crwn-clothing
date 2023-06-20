import { useParams } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/category.selector';
import ProductCard from '../../components/product-card/product-card.component';
import './category.styles.scss';


const Category = () => {
    const { category } = useParams();
    console.log('render/re-render Category component')
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);


    useEffect(() => {
        console.log('effect fired calling setProducts')
        setProducts(categoriesMap[category]);
    }, [categoriesMap, category]);

    return (
        <Fragment>
            <h2 className="category-title">{category.toUpperCase()}</h2>
            <div className="category-container">
            {products &&
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
        </div>

        </Fragment>

        

    );
}

export default Category;    
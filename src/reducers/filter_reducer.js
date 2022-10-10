import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
		let maxPrice = action.payload.map(p => p.price)
		maxPrice = Math.max(...maxPrice)
    return {
      ...state,
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      // values must be copied, not referenced
      all_products: [...action.payload],
      filtered_products: [...action.payload],
    }
  }
	if (action.type === SET_LISTVIEW) {
		return {
      ...state,
      grid_view: false,
    }
	}
	if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    }
  }
	if (action.type === UPDATE_SORT) {
		return {
			...state, 
			sort: action.payload,
		}
	}
	if (action.type === SORT_PRODUCTS) {
		const {sort, filtered_products} = state
		let tempProducts = [...filtered_products]
		if (sort === 'price-lowest') {
			tempProducts = tempProducts.sort((a,b) => a.price - b.price)
		}
		if (sort === 'price-highest') {
			tempProducts = tempProducts.sort((a, b) => b.price - a.price)
		}
		if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name))
    }
		if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name))
    }
		return { ...state, filtered_products: tempProducts }
	}
	if (action.type === UPDATE_FILTERS) {
		const {name, value} = action.payload
		return {
			...state, 
			filters: {
				...state.filters, 
				[name]: value
			}
		}
	}
	if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state
    const { text, company, category, color, price, shipping } = state.filters
    // always start with a fresh copy of ALL products
    let tempProducts = [...all_products]
    // FILTERING
    // text
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().includes(text)
      })
    }
    // category
    if (category) {
      if (category !== 'all') {
        tempProducts = tempProducts.filter(
          (product) => product.category === category
        )
      }
    }
    // company
    if (company) {
      if (company !== 'all') {
        tempProducts = tempProducts.filter(
          (product) => product.company === company
        )
      }
    }
    // color
    if (color) {
      if (color !== 'all') {
        tempProducts = tempProducts.filter((product) => {
          return product.colors.find((col) => col === color)
        })
      }
    }
    // price
		tempProducts = tempProducts.filter((product) => product.price <= price)
    // shipping
    if (shipping) {
      tempProducts = tempProducts.filter(
        (product) => product.shipping === true
      )
    }

    return { ...state, filtered_products: tempProducts }
  }
	if (action.type === CLEAR_FILTERS) {
		console.log('clear filters')
    return {
      ...state,
      filters: {
				...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,
      },
    }
	}
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
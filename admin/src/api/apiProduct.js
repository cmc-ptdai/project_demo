import axiosClient from './axiosCline';;

const fetchProduct = {
  getAllProduct: (params) => {
    const url = '/products'
    return axiosClient.get(url)
  },
  deleteProducts: (id) => {
    const url = `/products/${id}`
    return axiosClient.delete(url)
  },
  adProducts: (data) => {
    const url = `/products`
    return axiosClient.post(url,data)
  },
  editProducts: (id,data) => {
    const url = `/products/${id}`
    return axiosClient.put(url,data)
  }
}

export default fetchProduct;

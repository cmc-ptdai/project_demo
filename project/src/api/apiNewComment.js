import axiosClient from '../api/axiosClient'

const Slides = {
  addNewComment: (data) => {
    const url = '/newComment'
    return axiosClient.post(url, data)
  },
}

export default Slides

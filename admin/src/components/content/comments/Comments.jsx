import React, { useEffect, useState } from 'react';
import { Table, Popconfirm, Button } from 'antd';
import apiComment from '../../../api/apiComment'
import apiProduct from '../../../api/apiProduct'
import { useParams } from 'react-router-dom'
import './comment.scss'

const Comments = () => {
  const param = useParams()
  console.log(param);
  const [commentProduct, setCommentProduct] = useState()
  const [product, setProduct] = useState(null)
  const [sttFetchData, setSttFetchData] = useState(false)

  useEffect(() => {
    fetchComment()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param, sttFetchData])

  const fetchComment = async () => {
    const newArr = []
    const product = await apiProduct.getProductsById(param.id)
    const commentLocal = await apiComment.getCommentsById(param.id)
    newArr.push(product)
    setCommentProduct(commentLocal);
    setProduct(newArr);
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => (
        <p>{text.slice(0,10)}</p>
      )
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 210,
      render: (text, record) => (
        <div className="tableUser__button">
            <Button
              type="primary"
              style={{marginRight: '5px'}}
              className="btn-replyComment"
            >
              Reply
            </Button>
          <Popconfirm
            title="Bạn có muốn xóa người dùng này không?"
            onConfirm={() => handleOk(record)}
            onCancel={handleCancel}
          >
            <Button
              danger
            >
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    }
  ];

  const columnsProduct = [
    {
      title: 'Ảnh',
      dataIndex: 'img',
      key: 'img',
      render: text => {
        return (
          <div>
            <img src={text} alt="" style={{width: '200px', height: '160px'}}/>
          </div>
        )
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      key: 'price',
      render: text => {
        return (
          <div>
            <p>{text.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</p>
          </div>
        )
      }
    },
    {
      title: 'Đơn vị tính',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'Sale (%)',
      dataIndex: 'sale',
      key: 'sale',
    },
    {
      title: 'Hạn',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'còn lại',
      dataIndex: 'quantityPurchased',
      key: 'quantityPurchased',
    }
  ];

  const handleOk = (record) => {

    const a = record?.children
    console.log(record, a);
    if (a) {
      for (let i = 0; i < commentProduct.comments.length; i++) {
        if (commentProduct.comments[i].id === record.id) {
          const newListComment = commentProduct.comments.filter(item => item.id !== record.id)
          commentProduct.comments = newListComment
          break;
        }
      }
    } else {
      for (let i = 0; i < commentProduct.comments.length; i++) {
        let status = false
        for (let j = 0; j < commentProduct.comments[i].children.length; j++) {
          if (commentProduct.comments[i].children[j].id === record.id) {
            const newListComment = commentProduct.comments[i].children.filter(item => item.id !== record.id)
            commentProduct.comments[i].children = newListComment
            status = true
            break;
          }
        }
        if (status) {
          break;
        }
      }
    }
    apiComment.editComments(commentProduct.id, commentProduct)
    setSttFetchData(!sttFetchData)
  }
  const handleCancel = () => {}
  return (
    <>
    {
      product && (
        <Table
          columns={columnsProduct}
          dataSource={product}
          pagination={false}
          rowKey="id"
        />
      )
    }
    <h3 style={{marginTop: '30px'}}>comment product</h3>
     {
       commentProduct && (
        <Table
          columns={columns}
          dataSource={commentProduct.comments}
          rowKey="id"
          className="table-commentProduct"
        />
       )
     }
    </>
  )
}

export default Comments

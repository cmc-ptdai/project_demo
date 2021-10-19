import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './style.scss'

const Dashboard = () => {

  const store = useSelector(store => store)

  useEffect(() => {
  }, [])

  const money = () => {
    let a = 0
    store.orderReducer.forEach(item => {
      a = a + Number(item.money)
    })
    return a
  }

  const data = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    datasets: [
      {
        label: 'Tổng doanh thu',
        data: [500, 600, 850, 460, 280, 223, 268,330, 450, 570, 610, 240],
        fill: true,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.3,
      },
      {
        label: 'tổng số đơn hang',
        data: [200, 300, 250, 160, 180, 123, 168,230, 250, 270, 210, 140],
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
      },
  ]
  };
  const options = {
    maintainAspectRatio: true,
  }
  return (
    <div className="dashboard">
      <div className="dashboard-status">
        <div className="dashboard-status-item">
          <div className="dashboard-status-item-icon">
          <i className="far fa-usd-circle"></i>
          </div>
          <div className="dashboard-status-item-info">
            <h3>Total money</h3>
            <p>
              {
                money().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              &nbsp;
              VND
            </p>
          </div>
        </div>
          <Link
            to='/orders'
            className="dashboard-status-item"
          >
            <div className="dashboard-status-item-icon">
            <i className="fad fa-shopping-cart"></i>
            </div>
            <div className="dashboard-status-item-info">
              <h3>Order</h3>
              <p>{store.orderReducer.length}</p>
            </div>
          </Link>

        <Link
          to='/users'
          className="dashboard-status-item"
        >
          <div className="dashboard-status-item-icon">
          <i className="fad fa-users"></i>
          </div>
          <div className="dashboard-status-item-info">
            <h3>user</h3>
            <p>{store.userReducer.length}</p>
          </div>
        </Link>
        <Link
          to='/vegetable'
          className="dashboard-status-item"
        >
          <div className="dashboard-status-item-icon">
          <i className="fad fa-boxes"></i>
          </div>
          <div className="dashboard-status-item-info">
            <h3>Product</h3>
            <p>{store.productReducer.length}</p>
          </div>
        </Link>
      </div>
      <Line
        data={data}
        options= {options}
      />
    </div>
  )
}

export default Dashboard;

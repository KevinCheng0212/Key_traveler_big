import { React, useState } from 'react'
import style from '@/styles/order.module.scss'
import UserSideBar from '../user-side-bar'
import UserSideBarMobile from '../user-side-bar-mobile'
import PaginationComponent from '@/components/common/PaginationComponent'

export default function Order() {
  const orders = [
    {
      id: 1,
      number: 'P00001',
      date: '2023-08-15',
      totalPrice: 1800,
    },
    {
      id: 2,
      number: 'G00002',
      date: '2023-08-16',
      totalPrice: 800,
    },
    {
      id: 3,
      number: 'R00003',
      date: '2023-08-17',
      totalPrice: 1000,
    }
  ]
  const [selectedFilter, setSelectedFilter] = useState('全部')

  const filteredOrders = orders.filter((order) => {
    if (selectedFilter === '全部') {
      // 顯示所有訂單
      return true
    } else {
      const filterKey =
        selectedFilter === '一般' ? 'P' : selectedFilter === '團購' ? 'G' : 'R'
      return order.number.startsWith(filterKey)
    }
  })
  const handleFilterChange = (value) => {
    setSelectedFilter(value)
    setCurrentPage(1)
  }
  // 依篩選出的訂單數量標示序號
  const calculateOrderNumber = () => {
    let count = 0
    return () => {
      count++
      return count
    }
  }
  const getOrderNumber = calculateOrderNumber()

  const [currentPage, setCurrentPage] = useState(1)
  // 每頁顯示的項目數量
  const pageSize = 10
  // 處理頁碼變更事件
  const handlePageChange = (page) => {
    setCurrentPage(page)
    // console.log('currentPage is' + currentPage)
    // 在這裡可以處理分頁後的資料載入或其他操作
  }

  // 根據目前頁和每頁顯示的數量計算要顯示的數據
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  // const displayedData = data.slice(startIndex, endIndex)
  const currentOrders = filteredOrders.slice(startIndex, endIndex)
  return (
    <>
      <div className="container">
        <div className="row my-sm-4 my-2 ">
          <h2 className="fw-bolder text-start col-sm-3 col-12 mb-0 ">
            歷史訂單
          </h2>
        </div>
        <div className="row">
          <div className="col-sm-3 col-12 px-0 mx-0">
            <div className="d-sm-block d-none">
              <UserSideBar />
            </div>
            <div className="d-sm-none d-block col-12 mb-3">
              <UserSideBarMobile className="col-12 w-100" />
            </div>
          </div>
          <div className="col-sm-8 offset-sm-1 col-12">
            <div className="d-flex justify-content-end mb-2">
              <div
                className={`bg-primary-subtle ${style['sortBtn']} py-1 px-2`}
              >
                <div className="me-2">篩選</div>
                <div className="dropdown">
                  <button
                    className="btn btn-sm btn-light dropdown-toggle text-dark px-1 py-0"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {selectedFilter}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => {
                          handleFilterChange('全部')
                        }}
                      >
                        全部
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => {
                          handleFilterChange('一般')
                        }}
                      >
                        一般
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => {
                          handleFilterChange('團購')
                        }}
                      >
                        團購
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => {
                          handleFilterChange('租用')
                        }}
                      >
                        租用
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* 歷史訂單列表頁 電腦版 */}
            {/* {`table d-none d-sm-table`} */}
            {/* {`${style['table-desktop']} table`} */}
            <table className={`table d-none d-sm-table`}>
              <thead className="">
                <tr className="">
                  <th className="bg-primary"></th>
                  <th className="bg-primary text-white ps-5">訂單編號</th>
                  <th className="bg-primary text-white ps-5">訂單日期</th>
                  <th className="bg-primary text-white ps-5">訂單金額</th>
                  <th className="bg-primary text-white"></th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr className="" key={order.id}>
                    <td className="text-center">{getOrderNumber()}</td>
                    <td className="ps-5">{order.number}</td>
                    <td className="ps-5">{order.date}</td>
                    <td className="ps-5">{order.totalPrice}</td>
                    <td className="ps-5">
                      <button className="btn btn-primary text-light">
                        查看
                      </button>
                    </td>
                  </tr>
                ))}
                {/* <tr className="">
                  <td className="text-center">1</td>
                  <td className="ps-5">P00001</td>
                  <td className="ps-5">2023/08/15</td>
                  <td className="ps-5">1800</td>
                  <td className="ps-5">
                    <button className="btn btn-primary text-light">查看</button>
                  </td>
                </tr>
                <tr className="">
                  <td className="text-center">2</td>
                  <td className="ps-5">G00002</td>
                  <td className="ps-5">2023/08/16</td>
                  <td className="ps-5">800</td>
                  <td className="ps-5">
                    <button className="btn btn-primary text-light">查看</button>
                  </td>
                </tr>
                <tr className="">
                  <td className="text-center">3</td>
                  <td className="ps-5">R00003</td>
                  <td className="ps-5">2023/08/17</td>
                  <td className="ps-5">1000</td>
                  <td className="ps-5">
                    <button className="btn btn-primary text-light">查看</button>
                  </td>
                </tr> */}
              </tbody>
            </table>
            {/* 歷史訂單列表頁 手機版 */}
            {/* {`table table-bordered d-table d-sm-none`} */}
            {/* {`${style['table-mobile']} table table-bordered`} */}
            {filteredOrders.map((order) => (
              <table
                className={`table table-bordered d-table d-sm-none`}
                key={order.id}
              >
                <tbody>
                  <tr>
                    <th className="ps-3">{getOrderNumber()}</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th>訂單編號</th>
                    <td>{order.number}</td>
                  </tr>
                  <tr>
                    <th>訂單日期</th>
                    <td>{order.date}</td>
                  </tr>
                  <tr>
                    <th>訂單金額</th>
                    <td>{order.totalPrice}</td>
                  </tr>
                  <tr>
                    <td className="text-center" colSpan={2}>
                      <button className="btn btn-primary text-light">
                        查看
                      </button>
                    </td>
                  </tr>
                  {/* <tr>
                  <th className="ps-3">1</th>
                  <td></td>
                </tr>
                <tr>
                  <th>訂單編號</th>
                  <td>P00001</td>
                </tr>
                <tr>
                  <th>訂單日期</th>
                  <td>2023/08/15</td>
                </tr>
                <tr>
                  <th>訂單金額</th>
                  <td>1800</td>
                </tr>
                <tr>
                  <td className="text-center" colSpan={2}>
                    <button className="btn btn-primary text-light">查看</button>
                  </td>
                </tr> */}
                </tbody>
              </table>
            ))}
            <PaginationComponent
              totalItems={filteredOrders.length} // 總項目數量
              pageSize={pageSize} // 每頁顯示的項目數量
              currentPage={currentPage} // 目前頁碼
              onPageChange={handlePageChange} // 處理頁碼變化事件的callback function
            />
            {/* <PaginationComponent
              totalItems={data.length} // 總項目數量
              pageSize={pageSize} // 每頁顯示的項目數量
              currentPage={currentPage} // 目前頁碼
              onPageChange={handlePageChange} // 處理頁碼變化事件的callback function
            /> */}
          </div>
        </div>
      </div>
    </>
  )
}

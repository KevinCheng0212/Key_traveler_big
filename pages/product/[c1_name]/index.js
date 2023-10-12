import React, { useState, useEffect } from 'react'
import { Drawer, Button } from 'antd'
import styles from '@/pages/product/product.module.css'
import Accordion from '@/components/product/accordion'
import AsideFilter from '@/components/product/AsideFilter'
import PaginationComponent from '@/components/common/PaginationComponent'
import Card from '@/components/product/Card'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function ProductCate1() {
  // 路由相關
  const router = useRouter()
  const { c1_name } = router.query

  // 抓取DB相關
  const [cateProducts, setCateProducts] = useState([])
  useEffect(() => {
    if (router.isReady) {
      axios
        .get(`http://localhost:3005/api/products/qs?cate_1=${c1_name}`)
        .then((res) => {
          setCateProducts(res.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [router.isReady])
  console.log(cateProducts)

  // Drawer相關
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <div className={styles.banner}>
        <div className="w-100 h-100 p-4 p-sm-0">
          <img
            className={`w-100 h-100 object-fit-cover ${styles.rounded}`}
            src="/images/testBanner.png"
            alt="banner"
          />
        </div>
        <h1 className={`text-primary ${styles['display1']}`}>全部商品</h1>
      </div>
      <div className="container pt-md-5 ps-4 pe-4 p-sm-0">
        <div className="row">
          <div className="d-none d-sm-block col-12 col-sm-3 pe-md-5 pe-1">
            <Accordion />
            <hr className="text-primary opacity-100"></hr>
            <AsideFilter />
          </div>

          {/* sort btn & card group */}
          <div className="col-12 col-sm-9">
            {/* sort btn */}
            <div className="d-sm-flex d-none justify-content-end align-items-center mb-3">
              <div className={`bg-primary-subtle ${styles['sortBtn']}`}>
                <p className="fs-6">排序</p>
                <div className="dropdown">
                  <button
                    className="btn btn-light dropdown-toggle text-dark"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    預設
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        有貨優先
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        價錢：由低到高
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        價錢：由高到低
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        上架日期：由新到舊
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        上架日期：由舊到新
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 手機版篩選、排序結合 */}
            <div
              className="d-block d-sm-none bg-primary-subtle mb-3 text-end"
              style={{ fontSize: '16px', padding: '5px 20px' }}
            >
              <Button
                type="primary"
                onClick={showDrawer}
                className="bg-transparent text-black p-0"
                style={{ fontSize: '16px' }}
              >
                <i
                  class="fa-solid fa-sliders"
                  style={{ marginRight: '10px' }}
                ></i>{' '}
                篩選
              </Button>
            </div>
            <Drawer
              title="Basic Drawer"
              placement="right"
              onClose={onClose}
              open={open}
            >
              <Accordion />
              <hr className="text-primary opacity-100"></hr>
              <AsideFilter />
            </Drawer>

            {/* card group  */}
            <div className="d-flex row row-cols-2 row-cols-md-3 g-4 mb-sm-0 mb-4">
              {cateProducts.map((v, i) => (
                <div className="col" key={i}>
                  <div className="col">
                    <Card
                      title={v.name}
                      brand={v.brand}
                      price={v.price}
                      image={v.images ? JSON.parse(v.images)[0] : null}
                      stock={v.stock}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 分頁頁碼 */}
      {/* <div className="m-5">
        <PaginationComponent
          totalItems={totalPageCount}
          pageSize={PageSize}
          onPageChange={handlePageChange}
        ></PaginationComponent>
      </div> */}
    </>
  )
}

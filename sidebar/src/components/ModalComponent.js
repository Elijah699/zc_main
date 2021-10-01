import React, { useState } from 'react'
import styles from '../styles/ModalComponentStyles.module.css'
import arrow from '../assets/Shape.svg'

const ModalComponent = ({ isOpen }) => {
  // const switchModal = () => {

  // }
  return (
    <section className={`${isOpen ? styles.open : styles.topbarModal}`}>
      <div className={styles.sectionOne}>The BrandHub</div>

      <div className="my-2">
        <div className="p-1">Invite people to HNGi8</div>

        <div className="p-1">Create a new Workspace</div>
      </div>

      <div className="my-2">
        <div className="p-1">Prefrence</div>

        <div className="p-1">
          Customize HNGi8{' '}
          <span className="float-end">
            <img src={arrow} />
          </span>
        </div>
      </div>

      <div className="my-2 p-1">
        Tools{' '}
        <span className="float-end">
          <img src={arrow} />
        </span>
      </div>

      <div className="my-2 p-1">Sign Out</div>

      <div className="my-2">
        <div className="p-1">
          Add workspace{' '}
          <span className="float-end">
            <img src={arrow} />
          </span>
        </div>
        <div
          className="p-1"
          // onClick={switchModal}
        >
          Switch workspace{' '}
          <span className="float-end">
            <img src={arrow} />
          </span>
        </div>
        <div className="p-1">Open the Zuri Chat App</div>
      </div>
    </section>
  )
}

export default ModalComponent

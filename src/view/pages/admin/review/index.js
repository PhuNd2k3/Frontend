import './index.scss'
import { useEffect, useState } from 'react'
import adminReviewApi from 'api/adminreviewAPI'

function AdminReview(){

    const [review, setReview] = useState([])
    const [mainReview, setMainReview] = useState([])

    useEffect(()=> {
        const getReview = async () =>{
            try {
                const res = await adminReviewApi.getAllReview()
                setReview(res.data.feedbacks.filter((item)=> item.User.name != 'Nguyen Duc Phu'))
                setMainReview(res.data.feedbacks.filter((item)=> item.User.name != 'Nguyen Duc Phu'))
            }
            catch(err){
                console.log(err)
            }
        }
        getReview()
    },[])


    const reviews = mainReview.map((item)=> {
        return (
            <table className='admin-review-table'>
                <tr  className='admin-review-row'>
                    <td className='admin-review-product_name'>{item.Product.product_name}</td>
                    <td className='admin-review-user-name'>{item.User.name}</td>
                    <td className='admin-review-star'>{item.star}</td>
                    <td className='admin-review-content'>{item.content}</td>
                </tr>
            </table>
        )
    })


    return (
        <div>
            <h1 className='admin-review-header'>Danh sách review sản phẩm</h1>
                <div className='admin-review-btn'>
                    <button className='admin-review-star-btn'
                        onClick={()=> setMainReview(review)}
                    >Tất cả</button>
                    <button className='admin-review-star-btn'
                        onClick={()=> setMainReview(review.filter(r => r.star === 1))}
                    >1 sao ({review.filter(r => r.star === 1).length})</button>
                    <button className='admin-review-star-btn'
                        onClick={()=> setMainReview(review.filter(r => r.star === 2))}                    
                    >2 sao ({review.filter(r => r.star === 2).length})</button>
                    <button className='admin-review-star-btn'
                        onClick={()=> setMainReview(review.filter(r => r.star === 3))}                    
                    >3 sao ({review.filter(r => r.star === 3).length})</button>
                    <button className='admin-review-star-btn'
                        onClick={()=> setMainReview(review.filter(r => r.star === 4))}                    
                    >4 sao ({review.filter(r => r.star === 4).length})</button>
                    <button className='admin-review-star-btn'
                        onClick={()=> setMainReview(review.filter(r => r.star === 5))}                    
                    >5 sao ({review.filter(r => r.star === 5).length})</button>
                </div>
                <table className='admin-review-table' >
                    <tr className='admin-review-row'>
                        <th className='admin-review-product_name'>Tên sản phẩm</th>
                        <th className='admin-review-user-name'>Người đánh giá</th>
                        <th className='admin-review-star'>Số sao</th>
                        <th className='admin-review-content'>Lời đánh giá</th>
                    </tr>
                </table>
                {reviews}
        </div>
    )
}

export default AdminReview
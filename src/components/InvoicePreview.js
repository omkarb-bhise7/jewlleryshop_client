import React, { forwardRef } from 'react';
import qrCodeBase64 from '../components/assets/img.jpeg'
import logo from '../components/assets/logo.png'

const InvoicePreview = forwardRef(({ customer = {}, saleItems = [], products = [], invoiceNo = '', totalAmount = 0 }, ref) => {
  const total = saleItems.reduce((sum, item) => {
    const product = products.find(p => p._id === item.product);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const currentDate = new Date().toLocaleDateString();

  return (
    <div
      ref={ref}
      className="invoice-print border p-4 bg-white d-flex flex-column"
      style={{ width: '100%', fontFamily: 'Arial', color: '#000', minHeight: '850px' }}
    >
      {/* Company Header */}
      <div className="text-center mb-4">

        <img src={logo} alt="Logo" style={{ height: '100px' }} />
        <h3 className="mt-2">अलंकृत ज्वेल हब</h3>
        <p> Address: Shop No. 4, Arthav CHS, Plot No. C-5, Sector 20, Gavdevi Chowk, Near Bhagat School, Neral, Navi Mumbai.</p>
        <p> Contact numbers: 9920445447 / 9987164165 </p>
        <hr />
      </div>

      {/* Invoice Details */}
      <div className="d-flex justify-content-between mb-3">
        <div>
          <strong>Customer:</strong> {customer.name || '-'}<br />
          <strong>Contact:</strong> {customer.contact || '-'}
        </div>
        <div>
          <strong>Date:</strong> {currentDate}<br />
          <strong>Invoice No:</strong> {invoiceNo || '-'}
        </div>
      </div>

      {/* Product Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {saleItems.map(item => {
            const product = products.find(p => p._id === item.product);
            if (!product) return null;
            return (
              <tr key={item.product}>
                <td>{product.name}</td>
                <td>{item.quantity}</td>
                <td>₹{product.price.toFixed(2)}</td>
                <td>₹{(product.price * item.quantity).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    

      {/* Spacer */}
      <div style={{ flexGrow: 1 }} />

      {/* Total */}
      <div className="text-end mt-3">
        <h5><strong>Total Amount: ₹{total.toFixed(2)}</strong></h5>
      </div>

      

      <p className="text-center mt-3">Thank you for shopping with us!</p>
    </div>
  );
});



export default InvoicePreview;

import appstore from '../assets/appstore.png';
import './footer.css';

function Footer() {
    return(
        <footer className="text-center text-lg-start bg-light text-muted">
          {/* Section: Social media */}
          <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
            
            {/* Left */}
            {/* Right */}
            
            {/* Right */}
          </section>
          {/* Section: Social media */}
          {/* Section: Links  */}
          <section className>
            <div className="container text-center text-md-start mt-5">
              {/* Grid row */}
              <div className="row mt-3">
                {/* Grid column */}
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  {/* Content */}
                  <h6 className="text-uppercase fw-bold mb-4">
                    <i className="fas fa-gem me-3" />Thông tin
                  </h6>
                  <p>
                    Đây là hệ thống quản lý hàng hóa
                    hệ thống bao gồm hai ứng dụng
                    và đây là ứng dụng dành cho tài xế
                  </p>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  {/* Links */}
                  <h6 className="text-uppercase fw-bold mb-4">
                    Địa chỉ
                  </h6>
                  <p>
                    14, Quan Trong Hoang, Can Tho
                  </p>
                  <p>
                    59/31, Ben Hoa Vien, Can Tho
                  </p>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  {/* Links */}
                  <h6 className="text-uppercase fw-bold mb-4">
                    Đường dẫn
                  </h6>
                  <p>
                    <a href="#!" className="text-reset">Trang chủ</a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">Đơn hàng của bạn</a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">Đơn hàng hiện có</a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">Hỗ trợ</a>
                  </p>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  {/* Links */}
                  <h6 className="text-uppercase fw-bold mb-4">
                    Liên hệ
                  </h6>
                  <p><i className="fas fa-home me-3" /> Can Tho, Ninh Kieu</p>
                  <p>
                    <i className="fas fa-envelope me-3" />
                    hao152903@gmail.com
                  </p>
                  <p><i className="fas fa-phone me-3" />+84 932843656</p>
                </div>
                {/* Grid column */}
              </div>
              {/* Grid row */}
            </div>
          </section>
        </footer>
    );
}

export default Footer;
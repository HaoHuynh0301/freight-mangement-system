import appstore from '../assets/appstore.png';
import './footer.css';

function Footer() {
    return(
        <footer className="w-100 py-4 flex-shrink-0" style = {{
            borderTop: 'solid 0.5px grey',
        }}>
            <div className="container py-4">
            <div className="row gy-4 gx-5">
                <div className="col-lg-4 col-md-6">
                <h5 className="h1 text-dark">CONTACT</h5>
                <p className="small text-muted">Bạn có thể trao đổi với chúng tôi qua email</p>
                <p className="small text-muted mb-0"><a className="text-primary" href="#">thuanhaoctu@gmail.com</a></p>
                </div>
                <div className="col-lg-2 col-md-6">
                <h5 className="text-dark mb-3">Quick links</h5>
                <ul className="list-unstyled text-muted">
                    <li><a href="#">Trang chủ</a></li>
                    <li><a href="#">Thông tin</a></li>
                    <li><a href="#">Đơn hàng</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
                </div>
                <div className="col-lg-2 col-md-6">
                    <h5 className="text-dark mb-3">Tải ứng dụng tại</h5>
                        <img src = {appstore} style = {{
                            height: '100px',
                            width: '170px',
                            
                        }}></img>
                </div>
                <div className="col-lg-4 col-md-6" style = {{
                }}>
                    <h5 className="text-dark mb-3">Hợp tác</h5>
                    <p className="small text-muted">Hãy để lại số điện thoại của bạn, chúng tôi sẽ sớm liên hệ.</p>
                    <form action="#">
                        <div className="input-group mb-3">
                        <input className="form-control" type="text" placeholder="Số điện thoại" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <button style = {{
                            backgroundColor: '#ff7733'
                        }} className="btn btn-primary" id="button-addon2" type="button"><i className="fas fa-paper-plane" /></button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </footer>
    );
}

export default Footer;
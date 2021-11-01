import appstore from '../assets/appstore.png';
import chplay from '../assets/chplay.jpg';

function Footer() {
    return(
        <div style = {{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            borderTop: 'solid 0.2px #cccccc',
            paddingTop: '20px'
        }}>
            <div>
                <p style = {{fontSize: '18px', marginBottom: '10px', fontWeight: 'bold'}}>Công ty</p>
                <p style = {{color: 'blue'}}>Giới thiệu</p>
                <p style = {{color: 'blue'}}>Trung tâm trợ giúp</p>
                <p style = {{color: 'blue'}}>Điều khoản sử dụng</p>
            </div>
            <div style = {{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <p style = {{fontSize: '18px', marginBottom: '10px', fontWeight: 'bold'}}>Ứng dụng 2HDelivery</p>
                <img src = {appstore} style = {{
                    height: '70px',
                    width: '200px',
                    borderRadius: '10px'
                }} ></img>
                <img src = {chplay} style = {{
                    height: '70px',
                    width: '200px',
                    borderRadius: '10px'
                }} ></img>
            </div>
            <div style = {{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <img style = {{
                    height: '120px',
                    width: '120px',
                    borderRadius: '10px'
                }} ></img>
                <p style = {{color: 'grey', fontSize: '13px', marginTop: '15px'}}>2021 2HDelivery</p>
            </div>
            <div>
                <p style = {{fontSize: '18px', marginBottom: '10px', fontWeight: 'bold'}}>Địa chỉ công ty</p>
                <p style = {{color: 'blue'}}>Số 14, Quản Trọng Hoàng, Ninh Kiều</p>
                <p style = {{color: 'blue'}}>Khu 2, đại học Cần Thơ</p>
            </div>
        </div>
    );
}

export default Footer;
import React, {Component} from 'react';
import './footer.css'

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <footer className="page-footer p-5 bg-black text-white">
                    <div className="container">
                        <div className="d-flex justify-content-between">
                            <div className="footer-left">
                                <h3>Perfume</h3>
                                <p>(066) 696-66-23</p>
                                <br/>
                                <p>c 08:00 до 20:00 без перерыва и выходных</p>
                            </div>
                            <div className="footer-right">
                                <h3>Мы в соцсетях</h3>
                                <a href="https://www.linkedin.com/in/merikbest/">
                                    <i className="fab fa-linkedin fa-2x mr-3" style={{color: "white"}}></i>
                                </a>
                                <a href="#"><i className="fab fa-facebook-f fa-2x mr-3" style={{color: "white"}}></i></a>
                                <a href="#"><i className="fab fa-twitter fa-2x mr-3" style={{color: "white"}}></i></a>
                            </div>
                        </div>
                        <div className="mx-auto" style={{width: "200px"}}>
                            <p>© Copy right merikbest</p>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;
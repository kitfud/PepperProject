import React from 'react';


function Footer(props) {
    return(
    <div className="footer">
        <div className="container">
            <div className="row justify-content-center">             
                <div className="col-4 offset-1 col-sm-2">
                    <h5>Links</h5>
                    <ul className="list-unstyled">
                        <li><a href="/home">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/garden">Garden</a></li>
                        <li><a href="/contactus">Contact</a></li>
                    </ul>
                </div>
                <div className="col-7 col-sm-5">
                    <h5>Address</h5>
                    <address>
		              Broadway East<br />
		              Seattle, WA<br />
		              USA<br />
		            
		              <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:kitfuderich@gmail.com">
                         kitfuderich@gmail.com</a>
                    </address>
                </div>
                <div className="col-12 col-sm-4 align-self-center">
                    <div className="text-center">
                        <a className="btn btn-social-icon btn-facebook" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/kitfuderich"><i className="fa fa-facebook"></i></a>
                        <a className="btn btn-social-icon btn-linkedin" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/kfuderich/"><i className="fa fa-linkedin"></i></a>
                        <a className="btn btn-social-icon btn-twitter" target="_blank" rel="noopener noreferrer" href="https://twitter.com/kitfuderich?lang=en"><i className="fa fa-twitter"></i></a>
                        <a className="btn btn-social-icon btn-google" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/user/fuderich11/"><i className="fa fa-youtube"></i></a>
                        <a className="btn btn-social-icon" href="mailto:kitfuderich@gmail.com"><i className="fa fa-envelope-o"></i></a>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">             
                <div className="col-auto">
                    <p>© Copyright 2020 Kit Fuderich</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Footer;
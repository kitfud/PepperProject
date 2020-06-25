import React from 'react';

function Contact(props) {
    return(
        <div className="container">
            <div className="row row-content">
                <div className="col-12">
                <h3>Location Information</h3>
                </div>
                <div className="col-12" >
                        <h5>Our Address</h5>
                        <address>
                        530 Broadway E<br />
                        Seattle, WA<br />
                        USA<br />
                        <i className="fa fa-phone"></i>: +4132307016<br />
                        <i className="fa fa-envelope"></i>: <a href="mailto:kitfuderich@gmail.com">kitfuderich@gmail.com</a>
                        </address>
                </div>
                <div className="col-12">
                    <div className="btn-group" role="group">
                        <a role="button" className="btn btn-primary" href="tel:+4132307016"><i className="fa fa-phone"></i> Call</a>
                        <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                        <a role="button" className="btn btn-success" href="mailto:kitfuderich@gmail.com"><i className="fa fa-envelope-o"></i> Email</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
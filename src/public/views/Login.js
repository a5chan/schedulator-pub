import React from 'react';
import Facebook from '../components/Facebook';
import Google from '../components/Google';

export default class Login extends React.Component {
    render() {
        console.log("login loaded");

        return (
        	<div class="login-container">
                <a href="#" class="sunjulator-icon">
                    Sunjulator 
                    <img src="../images/feelsbadman.png" alt="Sunjulator Logo" height="32px" width="32px" />
                </a>
            	<div class="page-container">

            		<div class="page-content">
            			<div class="content-wrapper">
            				<div class="content">
                                <div class="panel panel-body login-form">
            					   <form action="/api/login" method='post'>
            							<div class="text-center">
                                            <h1 class='sh-login-title'>
                                                <span class='text-primary'>Sunjulator</span>
                                            </h1>
            								<div class="icon-object border-primary text-primary"><i class="icon-user"></i></div>
            								<h5 class="content-group">Login to your account <small class="display-block">Enter your credentials below</small></h5>
            							</div>
            							<div class="form-group has-feedback has-feedback-left">
            								<input type="text" class="form-control" placeholder="Email" name='email' />
                                                <div class="text-right">
                                                    <a href="#">Forgot Email?</a>
                                                </div>
            								<div class="form-control-feedback">
            									 <i class="icon-envelope text-muted"></i>
            								</div>
            							</div>
            							<div class="form-group has-feedback has-feedback-left">
            								<input type="password" class="form-control" placeholder="Password" name='password' />
                                            <div class="text-right">
                                                <a href="#">Forgot password?</a>
                                            </div>
            								<div class="form-control-feedback">
            									<i class="icon-lock2 text-muted"></i>
            								</div>
            							</div>
            							<div class="form-group">
            								<button type="submit" class="btn bg-primary btn-block">Sign in <i class="icon-circle-right2 position-right"></i></button>
                                            <div class="text-right">
                                                <a href="#">Create Account</a>
                                            </div>
            							</div>
                                    </form>
                                    <div class="buttons">
                                        <Google />

                                        <Facebook />
                                    </div>
            					</div>


            					<div class="footer text-muted text-center">
            						&copy; 2016. <a href="#">Sunjulator</a>
            					</div>
            				</div>
            			</div>
            		</div>
            	</div>
            </div>
        );
    }
}
import React, { Component } from 'react';

import '../assets/css/dashboard.css';
import '../assets/plugins/toggle-sidebar/css/sidemenu.css'
import $ from 'jquery';

class Sidebar extends Component {

    render() {

        return (

            <div>

                <div class="app-sidebar__overlay" data-toggle="sidebar"></div>
                    <aside class="app-sidebar">
                        <div class="app-sidebar__user">
                            <div class="dropdown">
                                <a class="nav-link p-0 leading-none d-flex" data-toggle="dropdown" href="">
                                    <span class="avatar avatar-md brround"></span>
                                    <span class="ml-2 "><span class="text-white app-sidebar__user-name font-weight-semibold">Matthew Fisher</span><br></br>
                                        <span class="text-muted app-sidebar__user-name text-sm">mwfisher91@gmail.com</span>
                                    </span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                    <a class="dropdown-item" href=""><i class="dropdown-icon mdi mdi-account-outline"></i> Profile</a>
                                    <a class="dropdown-item" href=""><i class="dropdown-icon mdi mdi-settings"></i> Settings</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href=""><i class="dropdown-icon mdi mdi-compass-outline"></i>Getting Started</a>
                                    <a class="dropdown-item" href="login.html"><i class="dropdown-icon mdi mdi-logout-variant"></i> Sign out</a>
                                </div>	
                            </div>
                        </div>
                        <ul class="side-menu">
                            <li class="slide">
                                <a class="side-menu__item active" data-toggle="slide" href=""><i class="side-menu__icon fas fa-home"></i><span class="side-menu__label">Dashboard</span><i class="angle fas fa-angle-right"></i></a>
                                <ul class="slide-menu">
                                    <li><a class="slide-item" href="index.html">Home</a></li>
                                </ul>
                            </li>
                            
                            <li class="slide">
                                <a class="side-menu__item" data-toggle="slide" href=""><i class="side-menu__icon fas fa-table"></i><span class="side-menu__label">Portfolio Wizard</span><i class="angle fas fa-angle-right"></i></a>
                                <ul class="slide-menu">
                                    <li>
                                        <a href="" class="slide-item">Asset Breakdown</a>
                                    </li>
                                    <li>
                                        <a href="" class="slide-item">Portfolio Snapshots</a>
                                    </li>
                                </ul>
                            </li>

                            {/* Investment Guidance */}
                            <li class="slide">
                                <a class="side-menu__item" data-toggle="slide" href=""><i class="side-menu__icon fas fa-table"></i><span class="side-menu__label">Lazy Portfolios</span><i class="angle fas fa-angle-right"></i></a>
                                <ul class="slide-menu">
                                    <li>
                                        <a href="portfolios.html" class="slide-item">General</a>
                                    </li>
                                    <li>
                                        <a href="" class="slide-item">Total Stock Market</a>
                                    </li>
                                    <li>
                                        <a href="" class="slide-item">Classic 60/40</a>
                                    </li>
                                    <li>
                                        <a href="" class="slide-item">Three-Fund Portfolio</a>
                                    </li>
                                    <li>
                                        <a href="" class="slide-item">No-Brainer Portfolio</a>
                                    </li>
                                    <li>
                                        <a href="" class="slide-item">Rick Ferri Core Four</a>
                                    </li>
                                    <li>
                                        <a href="" class="slide-item">Ivy Portfolio</a>
                                    </li>
                                    <li>
                                        <a href="" class="slide-item">Permanent Portfolio</a>
                                    </li>
                                    <li>
                                        <a href="" class="slide-item">Golden Butterfly</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </aside>
        
            </div>
        )
    }

    componentDidMount() {

        var slideMenu = $('.side-menu');

        // Toggle Sidebar
        $('[data-toggle="sidebar"]').click(function(event) {
            event.preventDefault();
            $('.app').toggleClass('sidenav-toggled');
        });

        if ( $(window).width() > 739) {     
            $('.app-sidebar').hover(function(event) {
                event.preventDefault();
                $('.app').removeClass('sidenav-toggled');
            });
        } 

        // Activate sidebar slide toggle
        $("[data-toggle='slide']").click(function(event) {
            event.preventDefault();
            if(!$(this).parent().hasClass('is-expanded')) {
                slideMenu.find("[data-toggle='slide']").parent().removeClass('is-expanded');
            }
            $(this).parent().toggleClass('is-expanded');
        });

        // Set initial active toggle
        $("[data-toggle='slide.'].is-expanded").parent().toggleClass('is-expanded');

    }
}

export default Sidebar;

'use strict';

var React = require('react'),
    UL = require('./../components/ElementUl');

var AdminSidebar = React.createClass({
  render: function() {
    var data = {
      'className': 'nav',
      'list': [
        {
          'className': '',
          'url': '#',
          'title': 'Li 1',
          'icon': 'fa fa-sitemap fa-fw',
          'span': 'fa arrow',
          'sublist': {}
        },{
          'className': '',
          'url': '#',
          'title': 'Li 2',
          'icon': 'fa fa-sitemap fa-fw',
          'span': 'fa arrow',
          'sublist': {}
        },{
          'className': '',
          'url': '#',
          'title': 'Li 3',
          'icon': 'fa fa-sitemap fa-fw',
          'span': 'fa arrow',
          'sublist': {}
        }
      ]
    };
    return (
      <div className='navbar-default sidebar' role='navigation'>
          <div className='sidebar-nav navbar-collapse'>
              <ul className='nav' id='side-menu'>
                  <li className='sidebar-search'>
                      <div className='input-group custom-search-form'>
                          <input type='text' className='form-control' placeholder='Search...'/>
                          <span className='input-group-btn'>
                              <button className='btn btn-default' type='button'>
                                  <i className='fa fa-search'></i>
                              </button>
                          </span>
                      </div>
                      {/*<!-- /input-group -->*/}
                  </li>
                  <li>
                      <a href='index.html'><i className='fa fa-dashboard fa-fw'></i> Dashboard</a>
                  </li>
                  <li>
                      <a href='#'><i className='fa fa-bar-chart-o fa-fw'></i> Charts<span className='fa arrow'></span></a>
                      <ul className='nav nav-second-level'>
                          <li>
                              <a href='flot.html'>Flot Charts</a>
                          </li>
                          <li>
                              <a href='morris.html'>Morris.js Charts</a>
                          </li>
                      </ul>
                      {/*<!-- /.nav-second-level -->*/}
                  </li>
                  <li>
                      <a href='tables.html'><i className='fa fa-table fa-fw'></i> Tables</a>
                  </li>
                  <li>
                      <a href='forms.html'><i className='fa fa-edit fa-fw'></i> Forms</a>
                  </li>
                  <li>
                      <a href='#'><i className='fa fa-wrench fa-fw'></i> UI Elements<span className='fa arrow'></span></a>
                      <ul className='nav nav-second-level'>
                          <li>
                              <a href='panels-wells.html'>Panels and Wells</a>
                          </li>
                          <li>
                              <a href='buttons.html'>Buttons</a>
                          </li>
                          <li>
                              <a href='notifications.html'>Notifications</a>
                          </li>
                          <li>
                              <a href='typography.html'>Typography</a>
                          </li>
                          <li>
                              <a href='icons.html'> Icons</a>
                          </li>
                          <li>
                              <a href='grid.html'>Grid</a>
                          </li>
                      </ul>
                      {/*<!-- /.nav-second-level -->*/}
                  </li>
                  <li>
                      <a href='#'><i className='fa fa-sitemap fa-fw'></i> Multi-Level Dropdown<span className='fa arrow'></span></a>
                      <ul className='nav nav-second-level'>
                          <li>
                              <a href='#'>Second Level Item</a>
                          </li>
                          <li>
                              <a href='#'>Second Level Item</a>
                          </li>
                          <li>
                              <a href='#'>Third Level <span className='fa arrow'></span></a>
                              <ul className='nav nav-third-level'>
                                  <li>
                                      <a href='#'>Third Level Item</a>
                                  </li>
                                  <li>
                                      <a href='#'>Third Level Item</a>
                                  </li>
                                  <li>
                                      <a href='#'>Third Level Item</a>
                                  </li>
                                  <li>
                                      <a href='#'>Third Level Item</a>
                                  </li>
                              </ul>
                              {/*<!-- /.nav-third-level -->*/}
                          </li>
                      </ul>
                      {/*<!-- /.nav-second-level -->*/}
                  </li>
                  <li>
                      <a href='#'><i className='fa fa-files-o fa-fw'></i> Sample Pages<span className='fa arrow'></span></a>
                      <ul className='nav nav-second-level'>
                          <li>
                              <a href='blank.html'>Blank Page</a>
                          </li>
                          <li>
                              <a href='login.html'>Login Page</a>
                          </li>
                      </ul>
                      {/*<!-- /.nav-second-level -->*/}
                  </li>
              </ul>
              <UL className={data.className} list={data.list} />
          </div>
          {/*<!-- /.sidebar-collapse -->*/}
      </div>
      // {/*<!-- /.navbar-static-side -->*/}
    );
  }
});

module.exports = AdminSidebar;

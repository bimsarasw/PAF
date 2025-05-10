import React, { useEffect, useState } from 'react';
import { FaUserGraduate, FaGraduationCap, FaRoad, FaTrophy } from "react-icons/fa";
import { MdNotifications, MdNotificationsActive } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import axios from 'axios';
import './NavBar.css';
import Pro from './img/img.png';
import { fetchUserDetails } from '../../Pages/UserManagement/UserProfile';

function NavBar() {
    const [allRead, setAllRead] = useState(true);
    const [googleProfileImage, setGoogleProfileImage] = useState(null);
    const [userType, setUserType] = useState(null);
    const [userProfileImage, setUserProfileImage] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const userId = localStorage.getItem('userID');
    let lastScrollY = window.scrollY;

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/notifications/${userId}`);
                const unreadNotifications = response.data.some(notification => !notification.read);
                setAllRead(!unreadNotifications);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        if (userId) {
            fetchNotifications();
        }
    }, [userId]);

    useEffect(() => {
        const storedUserType = localStorage.getItem('userType');
        setUserType(storedUserType);
        if (storedUserType === 'google') {
            const googleImage = localStorage.getItem('googleProfileImage');
            setGoogleProfileImage(googleImage);
        } else if (userId) {
            fetchUserDetails(userId).then((data) => {
                if (data && data.profilePicturePath) {
                    setUserProfileImage(`http://localhost:8080/uploads/profile/${data.profilePicturePath}`);
                }
            });
        }
    }, [userId]);

    useEffect(() => {
        const handleScroll = () => {
            // Set isScrolled state based on scroll position
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }

            // Handle navbar visibility
            if (window.scrollY > lastScrollY) {
                setIsVisible(false); // Hide navbar on scroll down
            } else {
                setIsVisible(true); // Show navbar on scroll up
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const currentPath = window.location.pathname;

    return (
        <div className={`navbar ${isVisible ? 'navbar_visible' : 'navbar_hidden'} ${isScrolled ? 'navbar_scrolled' : 'navbar_transparent'}`}>
            <div className="nav_con">
                <div className='nav_item_set'>
                    <div className='logo_section'>
                        <span className='site_name'>SnapWise</span>
                    </div>
                    <div className='nav_links_container'>
                        <div className='nav_bar_item'>
                            <p
                                className={`nav_nav_item ${currentPath === '/allPost' ? 'nav_nav_item_active' : ''}`}
                                onClick={() => (window.location.href = '/allPost')}
                            >
                                <FaGraduationCap className="nav_link_icon" /> Skill Post
                            </p>
                            <p
                                className={`nav_nav_item ${currentPath === '/allLearningPlan' ? 'nav_nav_item_active' : ''}`}
                                onClick={() => (window.location.href = '/allLearningPlan')}
                            >
                                <FaRoad className="nav_link_icon" /> Learning Plan
                            </p>
                            <p
                                className={`nav_nav_item ${currentPath === '/allAchievements' ? 'nav_nav_item_active' : ''}`}
                                onClick={() => (window.location.href = '/allAchievements')}
                            >
                                <FaTrophy className="nav_link_icon" /> Achievements
                            </p>
                        </div>
                    </div>
                    <div className='nav_icons'>
                        {allRead ? (
                            <MdNotifications
                                className={`nav_item_icon ${currentPath === '/notifications' ? 'nav_item_icon_noty' : ''}`}
                                onClick={() => (window.location.href = '/notifications')} />
                        ) : (
                            <MdNotificationsActive className='nav_item_icon_noty' onClick={() => (window.location.href = '/notifications')} />
                        )}
                        <IoLogOut
                            className='nav_item_icon'
                            onClick={() => {
                                localStorage.clear();
                                window.location.href = '/';
                            }}
                        />

                        {googleProfileImage ? (
                            <img
                                src={googleProfileImage}
                                alt="Google Profile"
                                className="nav_profile_img"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = Pro;
                                }}
                                onClick={() => {
                                    window.location.href = '/googalUserPro';
                                }}
                            />
                        ) : userProfileImage ? (
                            <img
                                src={userProfileImage}
                                alt="User Profile"
                                className="nav_profile_img"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = Pro;
                                }}
                                onClick={() => {
                                    window.location.href = '/userProfile';
                                }}
                            />
                        ) : (
                            <FaUserGraduate
                                className='nav_item_icon nav_profile_icon'
                                onClick={() => {
                                    window.location.href = '/userProfile';
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;


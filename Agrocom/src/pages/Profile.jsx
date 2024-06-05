import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import defaultprofile from '../assets/profile.jpg';

const Profile = () => {
  const [user, setUser] = useState({
    profilePicture: defaultprofile,
    username: '',
    bio: '',
    followersCount: 0,
    followingCount: 0
  });
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    profilePicture: '',
    username: '',
    bio: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/user/profile');
        const data = await response.json();
        setUser(data.user);
        setPosts(data.posts);
        setForm({
          profilePicture: data.user.profilePicture,
          username: data.user.username,
          bio: data.user.bio
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prevForm) => ({ ...prevForm, profilePicture: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ ...user, ...form });
    setEditMode(false);
  };

  const handleCancel = () => {
    setForm({
      profilePicture: user.profilePicture,
      username: user.username,
      bio: user.bio
    });
    setEditMode(false);
  };

  const handleAddClick = () => {
    navigate("/addpost");
  };

  const handleSignOutClick = () => {
    const confirmed = window.confirm("Are you sure you want to sign out?");
    if (confirmed) {
      navigate("/login");
    }
  };

  const renderPosts = () => {
    if (isLoading) {
      return <p>Loading posts...</p>;
    }

    if (activeTab === 'posts' && !posts.length) {
      return (
        <div className="no-posts">
          <p style={{ marginLeft: '5px' }}>Share your first photo!</p>
          <button onClick={handleAddClick} style={{ marginLeft: '50px',backgroundColor:"#34cc54", borderRadius:"5px" ,padding:"5px"}}>Share</button>
        </div>
      );
    }

    return posts.map((post) => (
      <Post key={post.id} post={post} />
    ));
  };

  return (
    <div style={{ padding: '2rem', color: '#34cc54', backgroundColor: '#000000', minHeight: '100vh', width: '100%', position: 'fixed' }}>
      {isLoading ? (
        <div style={{ textAlign: 'center', color: '#34cc54' }}>Loading...</div>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
            <img
              src={form.profilePicture}
              alt="Profile"
              style={{ width: '250px', height: '250px', borderRadius: '50%', objectFit: 'cover', marginRight: '2rem' }}
            />
            <div style={{ flex: 1 }}>
              {editMode ? (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Profile Picture:</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Username:</label>
                    <input
                      type="text"
                      name="username"
                      value={form.username}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '0.5rem', backgroundColor: '#1c1c1c', border: 'none', color: '#34cc54' }}
                    />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Bio:</label>
                    <textarea
                      name="bio"
                      value={form.bio}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '0.5rem', backgroundColor: '#1c1c1c', border: 'none', color: '#34cc54' }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{ padding: '0.5rem 1rem', backgroundColor: '#34cc54', border: 'none', color: '#000000', cursor: 'pointer', marginRight: '0.5rem' }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    style={{ padding: '0.5rem 1rem', backgroundColor: '#34cc54', border: 'none', color: '#000000', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <h3 style={{ margin: 0, fontSize: '2rem' }}>{user.username}</h3>
                  <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
                    <span>{posts.length} Posts</span>
                    <span>{user.followersCount} Followers</span>
                    <span>{user.followingCount} Following</span>
                  </div>
                  <p>{user.bio}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem',justifyContent:"flex-start" ,marginLeft:"70px"}}>
                    <button
                      onClick={() => setEditMode(true)}
                      style={{marginleft:"100px", padding: '10px', backgroundColor: '#34cc54', border: 'none', color: '#000000', cursor: 'pointer', borderRadius:"10px"}}
                    >
                      Edit Profile
                    </button>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative', top: '-9rem', left:'37rem',gap:"10px" }}> {/* Container */}
                    <button
                      onClick={() => navigate('/')}
                      style={{
                        backgroundColor: "#34cc54",
                        cursor: "pointer",
                        border: "none",
                        height: "50px",
                        width: "50px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        style={{
                          height: "45px",
                          width: "45px",
                        }}
                        loading="lazy"
                        alt="Add Post"
                        src="/flowbitehomesolid.svg"
                      />
                    </button>
                      <button
                        onClick={handleAddClick}
                        style={{
                          backgroundColor: "#34cc54",
                          cursor: "pointer",
                          border: "none",
                          height: "50px",
                          width: "50px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          style={{
                            height: "35px",
                            width: "35px",
                          }}
                          loading="lazy"
                          alt="Add Post"
                          src="https://www.svgrepo.com/show/59773/plus-square-button.svg"
                        />
                      </button>
                      <button
                        onClick={handleSignOutClick}
                        style={{
                          backgroundColor: "#34cc54",
                          cursor: "pointer",
                          border: "none",
                          height: "50px",
                          width: "50px",
                          position: "relative",
                          overflow: "hidden",
                          minWidth: "50px",
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          style={{
                            height: "35px",
                            width: "35px",
                          }}
                          loading="lazy"
                          alt="Sign Out"
                          src="/uilsignout.svg"
                        />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <hr style={{ margin: '1rem 0', border: '0.5px solid #807F7F',marginTop:"-25px" }} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <button
              onClick={() => handleTabChange('posts')}
              style={{
                padding: '1rem',
                backgroundColor: activeTab === 'posts' ? '#34cc54' : '#1c1c1c',
                border: 'none',
                 borderRadius:"10px",
                color: activeTab === 'posts' ? '#000000' : '#34cc54',
                cursor: 'pointer',
              }}
            >
              Posts
            </button>
            <button
              onClick={() => handleTabChange('saved')}
              style={{
                padding: '1rem',
                backgroundColor: activeTab === 'saved' ? '#34cc54' : '#1c1c1c',
                border: 'none',
                color: activeTab === 'saved' ? '#000000' : '#34cc54',
                cursor: 'pointer',
                 borderRadius:"10px"
              }}
            >
              Saved
            </button>
            <button
              onClick={() => handleTabChange('tagged')}
              style={{
                borderRadius:"10px",
                padding: '1rem',
                backgroundColor: activeTab === 'tagged' ? '#34cc54' : '#1c1c1c',
                border: 'none',
                color: activeTab === 'tagged' ? '#000000' : '#34cc54',
                cursor: 'pointer',
              }}
            >
              Tagged
            </button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            {renderPosts()}
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;

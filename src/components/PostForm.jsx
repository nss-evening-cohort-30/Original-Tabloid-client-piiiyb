import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPost, updatePost, getPostById } from "../managers/postManager";
import { getCategories } from "../managers/categoryManager";

export default function PostForm({loggedInUser}) {
    const { id } = useParams();
    const navigate = useNavigate();
    // !! converts to boolean. if id exists, isEditMode is true. if not, isEditMode is false
    const isEditMode = !!id;

    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        subTitle: "",
        body: "",
        categoryId: "",
        realTime: 0,
        userId: loggedInUser?.id || 0,
        publishedOn: null
    });

    useEffect(() => {
        getCategories().then(setCategories);
    }, []);

    useEffect(() => {
        if (isEditMode) {
            getPostById(id).then((post) => {
                setFormData({
                    title: post.title,
                    subTitle: post.subTitle,
                    body: post.body,
                    categoryId: post.categoryId,
                    realTime: post.realTime,
                    userId: post.userId,
                    publishedOn: post.publishedOn
                });
            });
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditMode) {
            updatePost(id, formData).then(() => {
                navigate("/my-posts");
            });
        } else {
            createPost(formData).then(() => {
                navigate("/my-posts");
            });
        }
    };

    const handleCancel = () => {
        navigate("/my-posts");
    };

    return (
        <div className="container mt-5">
            <h2>{isEditMode ? "Edit Post" : "Create New Post"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input 
                        type="text" className="form-control"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="subTitle" className="form-label">
                        Subtitle
                    </label>
                    <input 
                        type="text" className="form-control"
                        id="subTitle"
                        name="subTitle"
                        value={formData.subTitle}
                        onChange={handleChange}
                        required 
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="categoryId" className="form-label">
                        Category
                    </label>
                    <select 
                        className="form-select"
                        id="categoryId"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        required 
                    >
                        <option value="">
                            Select a category
                        </option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="realTime" className="form-label">
                        Estimated Read Time (minutes)
                    </label>
                    <input 
                        type="number" className="form-control"
                        id="realTime"
                        name="realTime"
                        value={formData.realTime}
                        onChange={handleChange}
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="body" className="form-label">
                        Content
                    </label>
                    <textarea 
                        className="form-control"
                        id="body"
                        name="body"
                        rows="10"
                        value={formData.body}
                        onChange={handleChange}
                        required 
                    />
                </div>

                <button type="submit" className="btn btn-primary me-2">
                    {isEditMode? "UpdatePost" : "CreatePost"}
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
}



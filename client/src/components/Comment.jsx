import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";

export default function Comment({ comment }) {
    const [user, setUser] = useState({});
    console.log(user);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();

                if (res.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [comment]);

    return <div className="flex mb-1 border-b dark:border-x-gray-200">
        <div className="flex-shrink-0 mr-2">
            <img className="w-10 h-10 rounded-full bg-gray-200" src={user.profilePicture} alt={user.username} />
        </div>

        <div className="flex-1">
            <div className="flex items-center mb-1">
                <span className="font-bold mr-1 text-xs truncate">{user ? `@${user.username}` : `anonymous user` }</span>

                <span className="text-gray-500 text-xs">{moment(comment.createdAt).fromNow()}</span>
            </div>

            <p className="text-gray-500 mb-2 pb-2">{comment.content}</p>

        </div>
        <h2>{user.name}</h2>
    </div>;
}

Comment.propTypes = {
    comment: PropTypes.shape({
        userId: PropTypes.string.isRequired,
    }).isRequired,
};

import React from "react";
import Divider from "@material-ui/core/Divider";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    IconButton,
} from "@material-ui/core";
import LetterAvatars from "./LetterAvatar";
import CommentMenu from "./CommentMenu";
import ChatIcon from "@material-ui/icons/Chat";
import CommentDialog from "./CommentDialog";

export default function Comments(props) {
    const { user, id, comments, submitComment } = props;
    const { showComments } = props;
    const [addCommentOpen, setAddCommentOpen] = React.useState(false);

    return (
        <div>
            {comments.map((_comment) => {
                const { _id, poster, comment, dateposted } = _comment;
                return (
                    <div
                        className="comment-wrapper"
                        style={{
                            backgroundColor: "#F5F5F5",
                            paddingTop: "1vh",
                            paddingBottom: "1vh",
                        }}
                    >
                        <div
                            className="comment-header"
                            style={{
                                marginLeft: "5vw",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <LetterAvatars user={user} />
                            <div
                                className="menu-right"
                                style={{
                                    marginLeft: "auto",
                                    marginRight: "0",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    style={{
                                        marginRight: "0",
                                        marginLeft: "auto",
                                    }}
                                >
                                    {new Date(dateposted).toDateString()}
                                </Typography>
                                <CommentMenu user={user} comment={comment} />
                            </div>
                        </div>
                        <div
                            className={`comment-content`}
                            style={{
                                marginLeft: "5vw",
                                color: "black",
                                opacity: "60%",
                                display: "flex",
                                paddingTop: "16px",
                                paddingBottom: "16px",
                                paddingLeft: "16px",
                                paddingRight: "16px",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="h6">{comment}</Typography>
                        </div>
                        <Divider variant="inset" />
                    </div>
                );
            })}

            <IconButton
                onClick={() => setAddCommentOpen(true)}
                style={{
                    backgroundColor: "transparent",
                    marginLeft: "auto",
                    marginRight: "0",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Typography
                    variant="h6"
                    style={{
                        marginRight: "0",
                        marginLeft: "auto",
                        color: "gray",
                    }}
                >
                    {`Add Comment`}
                </Typography>

                <ChatIcon
                    style={{
                        fontSize: "40px",
                        color: "gray",
                        marginLeft: "0.5vw",
                    }}
                />
            </IconButton>

            {addCommentOpen && (
                <CommentDialog
                    addCommentOpen={addCommentOpen}
                    setAddCommentOpen={setAddCommentOpen}
                    submitComment={submitComment}
                    reflectionID={id}
                />
            )}
        </div>
    );
}

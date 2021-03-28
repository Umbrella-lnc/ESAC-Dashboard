import React from "react";
import Divider from "@material-ui/core/Divider";
import { Grid, Card, CardContent, Typography, Button } from "@material-ui/core";
import LetterAvatars from "./LetterAvatar";

export default function Comments(props) {
    const { user, id, comments } = props;

    return (
        <div>
            {comments.map((_comment) => {
                const { _id, poster, comment, dateposted } = _comment;
                return (
                    <div
                        className="comment-wrapper"
                        style={{ backgroundColor: "#F5F5F5" }}
                    >
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
                            <LetterAvatars user={user} />
                            <Typography variant="h6">{comment}</Typography>
                        </div>
                        <Divider variant="inset" />
                    </div>
                );
            })}
        </div>
    );
}

import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import AnnouncementMenu from "./AnnouncementMenu";

const Announcement = (props) => {
    const { announcement, user, deleteAnnouncement } = props;

    return (
        <Grid item xs={12} key={announcement._id}>
            <Card>
                <CardContent
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="h4"
                        style={{
                            textDecoration: "underline",
                            marginRight: "0",
                            marginLeft: "auto",
                        }}
                    >
                        {announcement.title}
                    </Typography>

                    <Typography
                        variant="caption"
                        date={new Date(announcement.date)}
                        style={{
                            marginRight: "0",
                            marginLeft: "auto",
                        }}
                    >
                        {new Date(announcement.date).toDateString()}
                    </Typography>
                    <AnnouncementMenu
                        user={user}
                        deletePost={deleteAnnouncement}
                        id={announcement._id}
                    />
                </CardContent>
                <CardContent>
                    <Typography variant="h6">{announcement.post}</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Announcement;

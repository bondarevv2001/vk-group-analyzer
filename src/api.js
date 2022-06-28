/* eslint-disable no-unused-vars */
import axios from "axios";

async function getGroupById(id) {
  if (typeof id == "string") {
    id = id.replace(/ /g, "_");
  }
  return axios
    .get(
      `http://localhost:8080//method/groups.getById?group_id=${id}&fields=members_count&access_token=${process.env.VUE_APP_TOKEN}&v=5.131`
    )
    .catch((error) => console.error(error));
}

async function getGroupMembers(id, members_count) {
  const callCount = Math.ceil(members_count / 1000);
  const membersIds = [];
  const memberIdRequests = [];

  for (let i = 0; i < callCount; i++) {
    memberIdRequests.push(
      `http://localhost:8080//method/groups.getMembers?group_id=${id}&count=${Math.min(
        1000,
        members_count - i * 1000
      )}&offset=${i * 1000}&access_token=${process.env.VUE_APP_TOKEN}&v=5.131`
    );
  }

  //VK rate limit...
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  for (const request of memberIdRequests) {
    await axios
      .get(request)
      .then((response) => {
        if (response.data.error) {
          console.error(response.data.error);
        } else {
          membersIds.push(...response.data.response.items);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    await wait(334);
  }

  const totalMembersData = [];
  const totalMembersDataRequests = [];

  const maxDataHeaderSize = 1000;
  for (let i = 0; i < callCount; i++) {
    totalMembersDataRequests.push(
      `http://localhost:8080//method/users.get?user_ids=${membersIds
        .slice(
          i * maxDataHeaderSize,
          Math.min((i + 1) * maxDataHeaderSize, members_count)
        )
        .join()}&fields=sex,education,schools,bdate&access_token=${
        process.env.VUE_APP_TOKEN
      }&v=5.131`
    );
  }

  for (const request of totalMembersDataRequests) {
    await axios
      .get(request)
      .then((response) => {
        if (response.data.error) {
          console.error(response.data.error);
        } else {
          totalMembersData.push(...response.data.response);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    await wait(334);
  }

  return totalMembersData;
}

async function getGroupPosts(id) {
  return axios
    .get(
      `http://localhost:8080//method/wall.get?owner_id=-${id}&count=100&access_token=${process.env.VUE_APP_TOKEN}&v=5.131`
    )
    .then((posts) => {
      return posts.data.response.items.map((post) => ({
        date: new Date(post.date * 1000),
        likes: post.likes.count,
        comments: post.comments.count,
        reposts: post.reposts.count,
      }));
    });
}

export { getGroupById, getGroupPosts, getGroupMembers };

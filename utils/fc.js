export async function cronFeed(channel, nextPage) {
    try {

      const options = {
        method: 'GET',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjYjhlODhjYi0wOGYzLTQ4NGUtYmY1Yy0yYzdmOThlNDQyZjEiLCJlbWFpbCI6Im1haWx0b3JvbmFrZ3VwdGFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjcwNzNmNjE4OWZhNTNkZjJhMWFhIiwic2NvcGVkS2V5U2VjcmV0IjoiYTYyNjRkYjUyNjQyOTQyMjhmODA3NWZjYzk1MWJjNWUyM2JhYzllNDFlOWJjYzQwZDA1YTczMjViMzRhMTU1MiIsImlhdCI6MTcxMTIwNTYzOH0.n-SGvPinK6QWU4Q6tp5gljwu0-rJa6SETQi1fD1QRBg'
        }
      };
      
      const result = await fetch(
        `https://api.pinata.cloud/v3/farcaster/casts?channel=${channel}&pageToken=${nextPage}&pageSize=25`,options
      );
      const resultData = await result.json();
      console.log("resultData",resultData)
      const pageToken = resultData.data.next_page_token;
      const casts = resultData.data.casts;
      console.log("casts at cron",casts)
      const simplifiedCasts = await Promise.all(
        casts.map(async (cast) => {
          const fname = await getFnameFromFid(cast.fid);
          return {
            fid: fname,
            embeds: cast.embeds,
            content:cast.content,
            pageToken: pageToken,
          };
        }),
      );
      return simplifiedCasts;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  
  export async function getFnameFromFid(fid){
    const result = await fetch(
      `https://hub.pinata.cloud/v1/userDataByFid?fid=${fid}&user_data_type=USER_DATA_TYPE_USERNAME`,
    );
    const resultData = await result.json();
    const fname = resultData?.data?.userDataBody?.value || fid;
    return fname;
  }
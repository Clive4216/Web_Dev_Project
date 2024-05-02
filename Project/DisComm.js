
import { firebaseConfig } from './config.js';
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

async function joinCommunity(communityName, user) {
    if (!user) {
      alert("Please sign in to join the community.");
      return;
    }
  
    const { uid, email } = user;
  
    try {
 
      const userDoc = await firestore.collection('users').doc(uid).get();
      
      if (userDoc.exists) {
        const userData = userDoc.data();
        const { name, username } = userData;
  

        await firestore.collection(communityName).doc(uid).set({
          name: name || '',
          username: username || '',
          email: email || ''
        });
  
        alert(`Successfully joined ${communityName} community!`);
  
        console.log(`Join button class: .join-${communityName.toLowerCase()}-btn`);
        console.log(`Leave button class: .leave-${communityName.toLowerCase()}-btn`);
        document.querySelector(`.join-${communityName.toLowerCase()}-btn`).style.display = 'none';
        document.querySelector(`.leave-${communityName.toLowerCase()}-btn`).style.display = 'inline-block';
      } else {
        alert("User data not found in the database.");
      }
    } catch (error) {
      alert(`Error joining ${communityName} community: ${error.message}`);
    }
  }
  

  async function leaveCommunity(communityName, user) {
    if (!user) {
      alert("Please sign in to leave the community.");
      return;
    }
  
    const { uid } = user;
  
    try {
  
      await firestore.collection(communityName).doc(uid).delete();
  
      alert(`Successfully left ${communityName} community!`);
  
     
      console.log(`Join button class: .join-${communityName.toLowerCase()}-btn`);
      console.log(`Leave button class: .leave-${communityName.toLowerCase()}-btn`);
      document.querySelector(`.join-${communityName.toLowerCase()}-btn`).style.display = 'inline-block';
      document.querySelector(`.leave-${communityName.toLowerCase()}-btn`).style.display = 'none';
    } catch (error) {
      alert(`Error leaving ${communityName} community: ${error.message}`);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const joinCriBtn = document.querySelector('.join-cricket-btn');
    const leaveCriBtn = document.querySelector('.leave-cricket-btn');
  
    if (joinCriBtn && leaveCriBtn) {
      joinCriBtn.addEventListener('click', () => {
        const user = auth.currentUser;
        joinCommunity('Cricket', user);
      });
  
      leaveCriBtn.addEventListener('click', () => {
        const user = auth.currentUser;
        leaveCommunity('Cricket', user);
      });
    } else {
      console.error("One or more buttons not found.");
    }
  });

  document.getElementById('backbtn').addEventListener('click', function() {
    window.location.href = 'HomePage.html';
  });
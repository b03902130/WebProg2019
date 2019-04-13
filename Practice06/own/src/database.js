class PostContent {
    constructor(id, imgsrc, title, description, viewcount, rank) {
        this.id = id;
        this.imgsrc = imgsrc;
        this.title = title;
        this.description = description;
        this.vewcount = viewcount;
        this.rank = rank;
    }
}

class Database {
    constructor() {
        this.table = {
            "0": new PostContent(
                "0",
                "./images/cats/0.jpg",
                "Grumpy Cat Teams Up With Purina And Petsmart At Her Birthday Party In NYC",
                [
                    `Grumpy Cat teamed up with Purina® and PetSmart® to celebrate her sixth birthday party here in NYC! When Grumpy Cat invites you 
                    to her party, clearly you don't say no - so we were there to sing her happy birthday and watch her blow out her candles last week`,
                    `Contrary to her frowny appearance, Grumpy Cat's only birthday wish is for all of her pet friends to have a "pros-purr-ous year" 
                    so she has teamed up with Petsmart and Purina for their "Save A Fortune" promotion. I'm not gonna lie: Grumpy Cat's birthday party 
                    was way better than my last birthday party. There was a cake and cake pops, Grumpy Cat balloons, limited edition Grumpy Cat tarot cards, 
                    and a local fortune teller who read my fortune for me (spoiler: she said the next 3 months for me involves a lot of writing .... 
                    but that it would all be beneficial to my larger goals! Yay!)`,
                    `Grumpy Cat is so generous that consumers who spend $20 at Petsmart on qualifying Purina products (both dog and cat products) in a 
                    single purchase will receive a $5 gift card (mailed within 8-10 weeks) after submitting a photo of the receipt of purchase. Pet owners 
                    can also get additional gift cards for each additional $20 they spend. The promo runs through May 18 for purchases, and you can redeem 
                    your gift card online until May 31. And shoppers can save even more by going online and participating in an interactive "instant win" game 
                    with clairvoyant fortune telling kitty, Madame Fortuna - all at PurinaFortunes.com!`
                ],
                9999999,
                0
            ),
            "1": new PostContent(
                "1",
                "./images/cats/1.jpg",
                "Chewy Influencer Review: Temptations Holiday Treats",
                [
                    `It's Thomas the cat's lucky month (...who am I kidding, every month is lucky for him)! This month for Chewy's Pet Influencer program, 
                    we got TWO fun treats to test out! Today's post focuses on the mega pack of Temptations Cat Treats in "holiday" flavors, and we'll cover 
                    the 3-foot scratching post (!!!) he got in a separate review. Christmas came early for this silly kitty. Read on for our verdict!`,
                    `Thomas is already a huge fan of Temptations chicken treats and I, a human (DUH), am a pretty big fan of their amusing videos. If 
                    you haven't seen them, here are a couple for your viewing pleasure - and trust me, you'll want to watch the full videos with sound 
                    (since one is a cat singing "Don't You Forget About Me" with a full backing band, naturally).`,
                    `Anyhow. When the opportunity to try their new limited edition "Holiday Dinner" treat pack came along (which comes in in sweet potato 
                    and turkey flavor) Thomas nagged me constantly until I finally submitted my influencer pick. And then he waited by the door for the 
                    mail...well, that or he likes that the floor is heated by that part of the door. Anyone's guess.`,
                    `Let me be the first to say that even though Thomas is waited on hand and foot like a king, and has generally become a spoiled ball of 
                    fur (albeit a very nicely groomed ball of fur), he has not totally lost his animal instinct. The minute I brought the Chewy box into the 
                    apartment, his spidey senses went on high alert and he began assaulting the package in an (almost effective) attempt to open it.`
                ],
                9999999,
                1
            ),
            "2": new PostContent(
                "2",
                "./images/cats/2.jpg",
                "Pet Camera KittyO Provides Peace Of Mind For Pet Parents",
                [
                    `We tested out the KittyO, a pet camera with a laser pointer and treat dispenser that you control remotely through an app. Do YOU have a pet camera yet?`,
                    `If you haven't heard yet, KittyO is a pet camera, treat dispenser, and laser pointer all in one device. You control it remotely through an app on your 
                    phone - great for pet owners who *GASP!* actually have to leave the house every now and then. `,
                    `Sometimes I'll spy on him during the middle of the day to test my theory that as soon as I leave the house, he lays down for a nap and then awakens when 
                    I return, rejuvenated with the energy of ten thousand lightning bolts. Thanks to the KittyO, I now know that this is in fact true. I can also wake him up 
                    with my demon-voices and wear him out a little with the laser pointer.`,
                    `Thomas is fickle when it comes to laser pointers - usually he loves them but he often loses interest quickly. The KittyO laser pointer is no different, 
                    except that he sometimes gets distracted by the laser moving around in the unit, and just stares at it. Although ... it's very possible that he also could 
                    be confused by my demon-voices coming through the unit's speaker. Really, it's anyone's guess.`,
                    `It's really easy to set up, and the peace of mind you get from being able to check in on your pets is by far the best part (although Thomas would argue 
                    that it's the treat dispenser):`
                ],
                999997,
                2
            ),
            "3": new PostContent(
                "3",
                "./images/cats/3.jpg",
                "Help Us Recognize #RememberMeThursday And All The Shelter Pets Waiting For Forever Homes",
                [
                    `Have you heard? Today is Remember Me Thursday - pet advocates from across the world unite to shine a light on orphaned pets 
                    waiting to be adopted. Learn how you can get in on the movement.`,
                    `Remember Me Thursday is now in its fifth year of uniting animal lovers everywhere for one common goal - advocating animal adoption 
                    (which is definitely a cause we here at TCB can get behind)! It's a sad fact that over 2.7 million shelter pets lose their lives without finding 
                    their forever home. Remember Me Thursday aims to get the world on board with adopting - and so far has been successful in spreading adoption awareness 
                    - but there's so much more we can do to help. The organization's goal is that every person who uses social media on Thursday, September 28 will see a 
                    post about the importance of pet adoption.`,
                    `My heart breaks for those beautiful people working in animal welfare who are forced to take the lives of the pets they love. I believe lighting a candle 
                    for the orphan pets will be a way for people to let the world know how much they love them, and the awareness can help in increasing adoptions and 
                    decreasing euthanasia.`,
                    `Celebrities and animal influencers alike are participating in this global event - over the four years of its life, Remember Me Thursday has had 180 
                    countries participate.`,
                    `This year's official celeb spokesperson is Kristin Chenoweth - you may know her from her illustrious career in television, movies, and Broadway. What 
                    you may not know about her is that she is an animal rights advocate and dog mom to an adorable rescue pup named Thunder (or if you want to get formal 
                    with it, Ms. Thunder Boom Boom Chenoweth).`
                ],
                999997,
                3
            ),
            "4": new PostContent(
                "4",
                "./images/cats/4.jpg",
                "There Is A (Slightly) Green Cat Running Around Bulgaria",
                [
                    `Should you ever venture to the town of Varna, Bulgaria, keep your eyes peeled for the town's famous emerald green cat.`,
                    `First appearing in 2014, the stray green cat without a name began appearing and caught the attention both of tourists and locals alike. The townspeople 
                    assumed at first that the green coloring was due to a cruel prank, however after some detective work, they discovered that the cat had been sleeping in 
                    an old paint barrel. The cat showed no signs of sickness from the paint so people assumed that the dye was likely non-toxic and used for food or textiles. 
                    The green kitty was a tourist attraction and inspired people to bring her treats and extra food in the hopes of getting a photo of the veg-colored cat.`,
                    `We're glad that this beauty is returning to her natural coloring - you can tell from the photo on the right that she definitely gained some weight from 
                    all the treats people brought her! Lucky lady! What do you think about this green kitteh?`,
                ],
                999997,
                4
            ),
            "5": new PostContent(
                "5",
                "./images/cats/5.jpg",
                "Chewy Influencer Review: Wellness CORE Simply Shreds",
                [
                    `This month's Chewy Influencer review is for yet another Wellness product (but that's mainly because we LOVE Wellness and always choose their products 
                    to test out)... See what Thomas thought about Wellness CORE® Simply Shreds™`,
                    `Wellness' CORE Simply Shreds is a line of supplemental cat food packets that are to be used as a "snack" or a "side" to their regular meal. How spoiled 
                    is Thomas?! Of course, we opted to try the Boneless Chicken shreds because Thomas is a chicken-o-holic.`,
                    `The shreds come in 1.75 ounce packs and are meant to be used as a supplemental treat to a cat's regular food. The package literally says it's "perfect as 
                    a side" - y'know, to his entree of CHICKEN. This boy is going to turn into a chicken before long if I'm not careful!`,
                    `The package has little perforated sides where you can easily tear open the top BUT there is so much liquid inside that I ended up making a complete mess 
                    the first time I opened one. OK, let's be honest - I do NOT learn from my mistakes and basically made a mess every time I opened one. But it's OK, because 
                    Thomas was right there to slurp up every spilled drop of chicken juice! Win-Win!`,
                    `I actually didn't mind the excessive liquid since I know it's helping to hydrate the little man. I mainly mixed in half the packet to his regular food 
                    (Wellness chicken pate) and he scarfed it down like a wild animal! Well, I guess that makes sense.`
                ],
                999997,
                5
            ),
        };
        this.ranking = ["0", "1", "2", "3", "4", "5"];
    }
}

export default new Database();
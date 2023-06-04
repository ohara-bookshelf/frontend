import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  Tag,
  Text,
  VStack,
  useBreakpointValue,
  useDisclosure,
  useId,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import * as API from 'src/api';
import { IBook, IBookReview } from 'src/shared/interfaces';
import Loading from 'src/components/Preloader/Loading';
import BookCard from 'src/components/Card/BookCard';
import { useAuthStore } from 'src/flux/store';
import AddBookModal from './components/Modal/AddBookModal';
import BookReviewCard from './components/Card/BookReviewCard';
import BookReviewModal from './components/Modal/BookReviewModal';
import Rating from './components/Rating/Rating';
import axios, { AxiosError } from 'axios';

// const testReview: IBookReview[] = [
//   {
//     user: 'Ivana Books Are Magic',
//     text: "The Kitchen God's Wife was my second novel by Amy Tan. As it often the case with Tan, this novel focuses on the dynamics of an American Chinese family, more precisely on the relationship between a mother and a daughter. There are other characters, but there is no doubt that the mother and the daughter are the protagonists of this novel. Pear and Winnie are not only the sole narrators, they are what this novel is about. The Kitchen God’s Wife opens with the daughter’s narration. Pearl has been born to a Chinese mother and Chinese American father, that is, Pearl’s mother moved to USA to get married to an American Chinese man. Consequently, Pearl’s mother Winnie is still deeply rooted in her Chinese culture. Pearl, on the other hand, has grown up in USA and belongs to another culture. Pearl has a secret that she hides from her mother. Pearl has multiple sclerosis, a vicious immune disease (all immune diseases are chronic and incurable, so it is perhaps not that strange that Pearl hides it from Winnie). Pearl’s condition being something that I understand perfectly (suffering from an immune disease myself), made it easier for me to get involved into the story from the start. As the story progresses, we realize that the relationship between the Pearl and Winnie is quite complex, which by might another reason why Pearl has revealed her health condition to almost everyone but Winnie.When an elderly aunt dies, Pearls meditates about her past and present. While Pearl is reflecting on and writing about Chinese funeral customs, she also shares a lot about Chinese beliefs and traditions. I quite enjoyed reading about that. The way Pearl was explaining cultural related things was simple but interesting. Pearl doesn’t go into great detail, but as I said, she does some cultural explaining. What follows next is that Pearl’s mother Winnie invites Pearl and her family to an engagement party of their cousin. At the same time, Pearl’s aunt Helen confront Pearl, insisting that Pearl must tell Winnie the truth about her health condition or the aunt will. Helen does the same thing to Winnie, demanding that Winnie reveals her past (and the secrets it hides) to Pearl. I won’t get into what happens next (to avoid spoilers) but I need to mention that Winnie becomes a narrator as well. Winnie retells her incredibly painful life with a powerful voice. At times it was difficult to read about everything that happened to Winnie, I often felt like it was, quite frankly, too much. Is it even possible that so many horrible things can happen to somebody? There were a few episodes that could have been left out, as there was no need to turn an already tragic story into some kind of a contest of how many horrible things can happen to a single person. At one point I even felt frustrated, wondering how Winnie will ever manage to escape the vicious circle she was trapped in, but I’m certainly glad I continued reading as it all comes together in the end. Winnie makes for an amazing narrator, I simply loved her character. Even if I felt there was simply too much happening to Winnie, I sympathized with her every step of the way. While I was reading Winnie’s story I felt transported to another time and place. Pearl’s narrative is modern, Winnie’s is more old fashion, and somehow these two work perfectly together. Some parts of Winnie’s narrative continue to haunt me, especially one particular sentence that also happens to be my favourite quote from this book: „That is the saddest thing when you lose someone you love- that person keeps changing. And later you wonder. Is it the same person I lost? Maybe you lost more, maybe less, there are thousand things that come from imagination and you don't know which is which, which was true, which is false\".  I sweat that has to be one of the most profound things ever written about grief. When we mourn for somebody, when we try to accept somebody’s death, what we are afraid of is not only how we will live without them but how we will leave without their memory. The older I get, the more I realize that memory often plays trick on us. It is not as reliable as we want and need it to be. This the worst of pain, to wonder whether we remember the loved ones correctly, and knowing there is no way we can know for sure. That doubt (often followed by guilt) is perhaps what hurts us the most. On overall, I would say that this novel was easier to follow than The Joy Luck Club, mainly because there are only two narrators. In addition, the narrators both have very distinct voices. It is easy to understand both Winnie and Pearl but perhaps even more importantly one can understand why misunderstandings between them occur, perhaps even why they had to occur. Their relationship is a complex but a loving one. The way Pear and Winnie act both in respect to one another and to other people makes sense, the motivation behind their actions is very clear. This rounded character development is something I quite liked. Their characters are better developed and more rounded compared to those in The Joy Luck Club (even if we admit that there was less place for character development in that book, I have to notice that those characters were a little flat while these are anything but). Finally, both Winnie's and Pearl's life stories are interesting and worth reading, even if I think that on Winnie’s side of things there was some exaggeration. Not in the sense that these kind of terrible things described in Winnie’s life story didn’t use to happen to women, and probably still do for that matter, but in the sense that it felt excessive to include that amount of trauma and put it all on the shoulders of one character.This novel seems better developed and more mature than Tan’s first, yet somehow I still liked it a bit less than The Joy Luck Club. Having already been introduced to similar themes in Amy Tan’s previous novel, I have to admit that I felt a little less involved in the story. Reading The Joy Luck Club felt like being immersed into a magical world. I felt involved while I was reading this book, but not as fully immersed into the narrative as with the first one. There is magic in this one for sure, but something of that newness of reading experience that contributed to the feeling of what I now can call ‘wonder’ is gone. Had this been the first Amy Tam novel I have ever read, I would have had probably given it five stars, this way I think that a four star marking is more appropriate. I loved this novel but I can’t say I have fallen madly in love with it or anything like that. I had a feeling I got what I was hoping for, if you know what I mean, but there wasn’t anything extra. However, there is no doubt in my mind that The Kitchen God's Wife is a powerful novel, one well worth reading. I would certainly recommend this one, especially to those interested in themes it explores. ",
//     rating: '4',
//     positivity: 0.194,
//     negativity: 0.093,
//     neutrality: 0.713,
//     compound: 0.9993,
//     label: 'POSITIVE',
//   },
//   {
//     user: 'Hollie',
//     text: 'Maybe its because I just finished it, but I really liked this book. This is a story of a Chinese woman named "Winnie" and the secrets she keeps from her daughter, not only to protect her daughter, but to protect herself and her best friend. As with many of the books we read, Winnie has had a hard life, almost horrific in some respects but the reason I love her is that the story isn\'t tragic, she doesn\'t complain about it (too much), or make herself out to be a hero, well except maybe in her own mind. She tells her story to her daughter and it is as if I would tell something to my best friend, there are some embellishments, side gossip stories, and a little humor. The relationship between Winnie and her best friend Hulan/Helen is so realistic it has to make you laugh a little inside. The things they go through, the love/hate relationship, its like a dramatic or disfunctional version of I love Lucy, its makes it so much easier to connect to these characters and a much more enjoyable read.',
//     rating: '4',
//     positivity: 0.331,
//     negativity: 0.061,
//     neutrality: 0.608,
//     compound: 0.9973,
//     label: 'POSITIVE',
//   },
//   {
//     user: 'Willow ',
//     text: 'Amy Tan writes about women (complex women!) and I think that’s one of the things I love about her books. The men in her stories are shadows, almost undeveloped, with little presence except when they are cruel and threatening. I found this closed women’s world wonderfully refreshing, especially after reading so many books where men are the main focus. In The Godfather, Mario Puzo jumped into Mama Corleone’s point of view for just one small bit; just long enough to reveal that the wife of the mafia godfather did not concern herself with her husband’s violent world. She didn’t care. After all, men never concerned themselves with women’s problems. They were from two different worlds, and this separate view reminded me of Winnie, the main protagonist in The Kitchen God’s Wife. Winnie is so distant from her cruel husband that she doesn’t even know if Wen Fu is a gangster, and Tan never confirms it either. After all, it’s not important. The main focus is all about women. And the women are vivid too. Winnie and Helen come alive. By the end of the book I felt I knew them… quite well. Both their personalities and voices are so strong. I can still imagine them bickering with each other. And they are friends too -- true friends, who resent and care about each other. They even talk trash, yet they still stick together. I found this push and pull so real. There’s always a bit of one-upmanship with friends, and Tan knows this. You want good things for your friends, but you never want them to be too successful or too happy. It’s like sibling rivalry. LOLAnother great character was Auntie Du, who is an older woman with no husband (he died) and no money. She can’t even write. But she turns out to be this lovely hero, whom I just wanted to hug. In a society that undervalues widows and spinsters, I loved that she saved the day, and she didn’t even ask for credit. What a great character! As with all of Tan’s books, I love her simple but lyrical prose, and I love all the details she adds about China before and after the war. Tan takes you a different world and a different culture, but makes it familiar simply by introducing you to these fascinating and flawed women. The love and pain they feel is universal, and I found myself quite choked up at the end, thinking about the friends and family that are in my own women’s world. Problems I had with this book were the slow parts. Winnie’s daughter Pearl is definitely not as interesting as her mom (although I found her relationship with her mother poignant.) Wen Fu (Winnie’s husband) is almost too cruel, too inhuman. He’s such a monster. I really hated him, which is good for a villain. But like all Tan’s men, he was a shadow, very evil, but a shadow nevertheless. I think Tan revealed way too much of the ending in the beginning when Pearl is telling her story. Having Winnie go back and explain how things led up to where she was in the present, when you already know the outcome, kills a lot of the suspense. But all in all, I enjoyed this a lot. If you’ve never read a Tan book, you’ll be instantly transported to a new world. But if you’ve read her other books, you’ll definitely recognize many of the same themes and character types that she usually writes about. I give The Kitchen’s God’s Wife **** ½. It’s a great book!',
//     rating: '5',
//     positivity: 0.186,
//     negativity: 0.108,
//     neutrality: 0.706,
//     compound: 0.9955,
//     label: 'POSITIVE',
//   },
//   {
//     user: 'Debbie Zapata',
//     text: "Secrets. Mothers and daughters nearly always keep secrets from each other. But at some point in life the secrets need to be told....don't they? Winnie, Pearl's mother, faces this dilemma. Winnie's dearest friend Helen is threatening to tell Pearl all of the secrets of Winnie's early years in China. So Winnie decides to tell Pearl her life story before Helen does. Because of course Helen would not tell it correctly anyway.But Pearl has a secret of her own. Will hearing her mother's secrets give her the courage to share hers?This book was sometimes quite painful to read. Readers who are overly sensitive to scenes of abuse of any kind may not be able to deal with parts of this story. We see what Winnie lived through because of her arranged marriage to a complete jerk; and from the war in China in the 1930's and 40's. She suffered immensely but did have a few triumphs at times and somehow held onto a deep-down core of strength that perhaps surprised even herself. Chance is the first step you take, luck is what comes afterward.But you have to have the courage to take that first step, and trust that the luck will follow your path. I think Winnie did this the best way she could. I hope Pearl learns to do the same. I promised my mother that I would take her this book in May. She recently discovered Tan's work when she read The Bonesetter's Daughter. We are planning a book swap. It will be fun to discuss them after reading, because we have discovered a bit of a secret between ourselves lately. Every so often we both actually like the same books! Maybe that means one or the other of us is getting older and smarter?",
//     rating: '4',
//     positivity: 0.209,
//     negativity: 0.082,
//     neutrality: 0.71,
//     compound: 0.9938,
//     label: 'POSITIVE',
//   },
//   {
//     user: 'Debra ',
//     text: "The book begins with Pearl planning on attending a wedding but then also learns there is a funeral. As most of Tans books, this book deals with family history, relationships, some cultural history of China, the life of women in China and assimilation to the United States.Winnie and her friend Helen have a kept a secret for most of their lives, Winnie's daughter Pearl also has a secret she has been keeping from her Mother. Helen steps in, claims she is dying (is she?) and tells each Winnie and Pearl that they need to tell their secrets or she will. Winnie decides that she will tell her daughter what she has kept secret from her.Winnie's story is set on a small island outside of Shanghai in the 20's but she moves to other locations in China prior to coming to the United States in 1949.Winnie's story is a sad one, born to a beautiful mother who one day disappeared she is sent to live with a distant relative, he way of life changes drastically. She ends up being married to a man who physically and emotionally abuses her. This is only the beginning. Her story may be painful to some who have suffered domestic violence, or who have suffered the loss of their children. Winnie does not have a happy life until she meets Pearl's father in China at a Military Dance. They fall in love and then begins the story of Winnie trying to escape to be with the man she loves. Pearl in turn, shares her \"secret\" with her Mother. Her secret does not have the same impact (for me the reader). Their shared confessions serve to bring them closer and ends with Winnie wanting to take Pearl on a trip. Amy tan does complex relation ships well. She is able to show the complexities of Mother/Daughter relationships. Winnie and Pearl were not close their relationship has not always been good. Tan also writes about female friendships, husband/wife relationships in this book. Her writing is beautiful and lyrical. I enjoyed how Winnie's story was told. It almost felt like a book within a book. 4 Stars for me. I found I did not like this book as much as I liked some of her others. Tan's writing is beautiful but at times I wanted to have things speed up a little. Some may not like the changing POV of the main characters. But I think most wont mind.",
//     rating: '4',
//     positivity: 0.147,
//     negativity: 0.091,
//     neutrality: 0.762,
//     compound: 0.9807,
//     label: 'POSITIVE',
//   },
//   {
//     user: 'L Y N N',
//     text: "Full review: http://books-n-music.blogspot.com/201.... I never cease to be amazed at the treatment and plight of women throughout history. I'm certain I wouldn't have lived long, 'cause, honestly, my goal would have been to make sure I took out at least a couple of the meanest men with me! Unbelievable to me and so very very sad. How can dismissing half the human race be justified? I assume Tan is accurate in her portrayal of females in China during the early to almost mid-20th Century. And if so...well, it just wasn't right. And her first/Chinese husband. What a vile creature. Wen Fu had absolutely no redeeming qualities whatsoever. I was so very glad for her to find Jimmie and make a life with him in the U.S. At least she was able to enjoy what appeared to be a true partnership and genuine love and respect with her second husband. (I feel as if I know that feeling well!) And the keeping of secrets and divulging of withheld knowledge and history...such a fascinating practice amongst us humans toward one another! Especially with regard to our own children. More and more I realize that no one person knows every little thing about any of us. We choose to share certain things with certain others, but I'm sure no one person has shared every little thing about themselves with any one other person...we spread ourselves out amongst those we know, as it were. And really, what do our grown children know about us? Especially with regard to our prior history before raising children? Probably very little. And if they knew more? Would it be eye-opening as it seemed to be for Pearl? Or not...? What an amazing study of secrets and relationships!",
//     rating: '5',
//     positivity: 0.139,
//     negativity: 0.047,
//     neutrality: 0.814,
//     compound: 0.97,
//     label: 'POSITIVE',
//   },
//   {
//     user: 'Donna',
//     text: "The bulk of this story takes place in war time in China. With that being said, I liked how this was NOT a story or retelling of that historical fact. It truly was a story of a woman who was torn oftentimes between traditonal China and wanting a better life. Her life had so much tragedy I was sad to read some of it. But it was all told for an important purpose and not just to be told for the story's sake. Amy Tan's characters are always so well developed as well as her descriptions of what is all around with out being boring or pointless (that is one of my biggest pet peeves). I always feel like I know her characters so well, both the flaws and the strengths.",
//     rating: '4',
//     positivity: 0.175,
//     negativity: 0.081,
//     neutrality: 0.744,
//     compound: 0.9306,
//     label: 'POSITIVE',
//   },
//   {
//     user: 'Anna',
//     text: "Had to catch my breath....I just love Amy Tan, and I wanted to give this modern classic five stars because she's certainly worth it as a writer. But I kept hoping and worrying about our main character, Winnie! How many times can one person get f--ed over in a lifetime? Before they're even 30?! I know, I know -- World War II, the Chinese, the Chinese, the Chinese, spousal abuse, the Chinese, the Chinese, the Chinese..... I get it......but I had to suspend my disbelief a bit at the end in a plot involving a final confrontation with the villain...... I also would have liked to see more development of the present day part of the story. Some loose ends didn't quite get tied up. But this is worth diving into headfirst -- Tan is a writer who's conversational style of narrati0n is so good, she takes you directly to the villages and cities in war-torn China so well, you're totally immersed in the story. The novel works as an inter-generation immigrant story as well as historical fiction and family drama -- if you like these types of fiction, you'll probably think this is worth a read. ",
//     rating: '4',
//     positivity: 0.172,
//     negativity: 0.102,
//     neutrality: 0.726,
//     compound: 0.9132,
//     label: 'POSITIVE',
//   },
//   {
//     user: 'Elyse Walters',
//     text: "I read this when it came out -- I thought I had written a review --no? It's holding -(all these years later) -a lasting wonderful reading impression. The culture -the relationships: struggles and love -the foods - it was all delicious.",
//     rating: '5',
//     positivity: 0.287,
//     negativity: 0.053,
//     neutrality: 0.66,
//     compound: 0.9001,
//     label: 'POSITIVE',
//   },
//   {
//     user: 'Julia',
//     text: "great story about a relationship between a mother and daughter. we all, to some degree, struggle with our relationships with our mothers. this book made me look deeply at my own relationship with my mom and got me thinking about how much about my mom and her life that i still don't know. my mom is reading this now and we've had some great conversations about this and what it means to our own relationship. this is a wonderful story about (1) the incredible love of a mother; (2) cultural assimilation and native cultures; (3) the rise of communist china; (4) a woman's fight for self-determination and empowerment; (5) surviving domestic violence.",
//     rating: '5',
//     positivity: 0.146,
//     negativity: 0.072,
//     neutrality: 0.782,
//     compound: 0.8834,
//     label: 'POSITIVE',
//   },
//   {
//     user: 'Mary K',
//     text: 'I was so caught up in the main character of this book that I often forgot I was reading fiction. Wonderful story, beautifully written. It will certainly make you realize how little we know about our mothers’ hearts and lives as human beings.',
//     rating: '5',
//     positivity: 0.209,
//     negativity: 0,
//     neutrality: 0.791,
//     compound: 0.8689,
//     label: 'POSITIVE',
//   },
//   {
//     user: 'Joyce',
//     text: "I decided to re-read this since it had been at least 15 years since I first read it and I remembered it not one whit (that says more about me than it does the novel). Yet there are Cliffs Notes on it now?! Arrgh! A friend of mine who teaches with me also admitted that she got tired of teaching the Joy Luck Club, so she started teaching this one instead because many of the same themes are explored.I'd agree it's every bit as satisfying as the Joy Luck Club, although if I had to choose between the two books to be stranded with on a desert island, I'd pick Amy Tan's first novel. I happen to love the alternating viewpoints in that book (which, I fully realize, confused the heck out of some people). The Kitchen God's Wife has a simple framing device and then it's told mostly from a single point of view, so it's less challenging in that regard. But the mother's story is every bit as heart-wrenching and Tan's pen is every bit as talented here. In fact, Amy Tan has written nothing I didn't like EXCEPT for her last novel, Saving Fish From Drowning, which was a total disaster. Hated. It.",
//     rating: '4',
//     positivity: 0.142,
//     negativity: 0.068,
//     neutrality: 0.79,
//     compound: 0.856,
//     label: 'POSITIVE',
//   },
//   {
//     user: 'Jennifer Cole',
//     text: 'What I learned from this book--my favorite part:"Isn\'t that how it is when you must decide with your heart? You are not just choosing one thing over another. You are choosing what you want. And you are also choosing what somebody else does not want, and all the consequences that follow. You can tell yourself, That\'s not my problem, but those words do not wash the trouble away. Maybe it is no longer a problem in your life. But it is always a problem in your heart."',
//     rating: '5',
//     positivity: 0.156,
//     negativity: 0.03,
//     neutrality: 0.814,
//     compound: 0.8312,
//     label: 'POSITIVE',
//   },
//   {
//     user: 'Caroline',
//     text: 'The book starts out in contemporary America, and is narrated by Pearl – a second generation Chinese emigrant, who is trying to balance her own 21st century American family life with the needs of her Chinese mother and her mother’s friends. From the third chapter on the narrating is taken over by Winnie, Pearl’s mother, and it transforms into being the story of her life – told against the background of her living in Shanghai in the 1930s and 40s, under the Kuomintang, but with the Communists already making their presence felt, and her experiences with the Japanese invasion of Shanghai . On a personal level it is about Winnie’s relationships, with her own mother, with her first husband Wen Fu, with her friends Hulan, Peanut, Min and Grand Auntie Du, and finally, about her relationship with the Chinese-American translator Jimmy Louie. The first pillar of the book for me was the suffocating nature of the family life portrayed. It starts in the present day, with a mother/daughter relationship that I found cringingly intrusive. In fact the whole family is way too over bearing, and that isn’t even just blood relatives. It also includes various friends who have been sucked into this gooey familial web. The second pillar was the superstition that is rife throughout the whole story. From the eccentricities of Grand Auntie Du’s household alter , to a plethora of omens that drench the lives of these people – inspiring or damning – and always taken seriously. At one stage there is a visit to a fortune teller, but this seems superfluous given that their lives are already heavily dominated by a super-awareness of portents of good and bad fortune.The third and final pillar of the book for me was the ubiquitous male dominance in Chinese society at this time. This was illustrated in the general culture, in the licence given to Winnie’s first husband, and in the heavy governance of her father, both towards her and her mother. Men ruled and marriage was all. But this pillar had woodworm.... The women in the story were rebelling – through friendship and support for one another, through the changing politics of the time, and through the sheer cussedness and determination of the main female protagonists in the story.My least favourite character at the beginning of the book was Helen, or Hulen as she was known in China, but as time went on I could not help but be beguiled by the riches that the author brought to her personality. She was stupid and clumsy, touching, wily, endearing, maddening, loyal, naive, preposterous, turncoat and vulnerable... By the end of the book I found her quite irresistible. Such a huge character. It was a pleasure to follow the ups and downs of her friendship with Winnie, and have my initial dislike so overturned. In fact all the women characters in the book had a lot of presence for me.The book ends with a return to the present day, with Winnie and her daughter Pearl coming to terms with a lot of things in one another’s lives that they had previously kept secret, and we sense a new closeness between them.For the most part though the book is harsh and quite brutal. Winnie did not have an easy life, not only in personal terms, but also in what she went through whilst being bombed, in fleeing the Japanese army, and in the aftermath of the war. Having said that – there is a happy ending – and the glow from that did much to warm the cockles of my cowardly heart.',
//     rating: '3',
//     positivity: 0.106,
//     negativity: 0.093,
//     neutrality: 0.801,
//     compound: 0.8047,
//     label: 'POSITIVE',
//   },
//   {
//     user: 'Julie',
//     text: "This is my favorite of Amy Tan's books. I loved it!",
//     rating: '5',
//     positivity: 0.473,
//     negativity: 0,
//     neutrality: 0.527,
//     compound: 0.8016,
//     label: 'POSITIVE',
//   },
//   {
//     user: 'Colleen ',
//     text: "Ying-gai = I should have. To me, king-gai meant my mother lived a life of regrets that never faded with time.Chance is the first step you take, luck is what comes afterward. I don't know why something that made me so happy then feels so sad now. Maybe that is the way it is with the best memories. Ai-ya!",
//     rating: '5',
//     positivity: 0.178,
//     negativity: 0.094,
//     neutrality: 0.728,
//     compound: 0.7745,
//     label: 'POSITIVE',
//   },
//   {
//     user: 'Kasia',
//     text: "I adore the way Amy Tan intertwines more than one story line into her books, at first glance it seems that the tale centers on Pearl, the daughter of a Chinese immigrant, who has morphed into the modern American culture and who finds her mother annoying and old fashioned at times. Once the reader gets familiar with Pearl the story then turns back to her mother, Winnie and her childhood friend Helen. Winnie's story is sad and beautiful at the same time, her suffering and struggles to overcome an abusive husband who's been keeping her from freedom half her life are intense and emotionally moving. Tan's rich, descriptive writing has deep meanings hidden in words. I found myself laughing quite often, which was a surprise because the story is pretty intense. As usual the author supplies us with deep insight into the ugly reality of life, one of my favorite lines was on page 352, \"The society is like bright pain applied on top of a rotten wood\" which made me stop and think, digest and absorb her wise words, Tan is a master of writing tales with imperfect characters, so many of them have so called rotten bases, and their struggle to improve and move on make the tale even more vivid and intense. In this case it was the way of life for Pearl in wartime China, the harsh reality was that she didn't have much of a saying; all the older men and women in her house seemed to run her life, and the male dominated culture didn't help when the girl was going through hardship, if anything it made her life more hellish, and at times it was hard to read but I continued, good books aren't always pretty.This was a good and potent read, I must warn readers that they might get angry at the bad men in Pearl's life, but her struggles never diminished her personality and her big heart, which she has to this day. I feel that Tan's books not only entertain but also teach a lot, not to mention show us how life in the past was so much harsher, and remind us of individual struggles that women still have to go through, whether they are someone's wife or daughter or best friend, and that deep down we are strong, and our stories are beautiful, and that life might never be fair, but we try our best to fight for it.",
//     rating: '5',
//     positivity: 0.137,
//     negativity: 0.133,
//     neutrality: 0.73,
//     compound: 0.7328,
//     label: 'POSITIVE',
//   },
//   {
//     user: 'Meghan Becker',
//     text: 'This is probably in my top 5. So good.',
//     rating: '5',
//     positivity: 0.416,
//     negativity: 0,
//     neutrality: 0.584,
//     compound: 0.6115,
//     label: 'POSITIVE',
//   },
//   {
//     user: 'Spider the Doof Warrior',
//     text: "I love this book. Winnie is so brave. She was stuck with an evil, horrible husband. She went through WW2. Her daughter didn't know all of this about her so she tells her all that she went through. It's a great book about revealing secrets and her daughter learns to admire her mother's strength and find the same in herself. Also, why do so many folks have to marry horrible, awful people?",
//     rating: '4',
//     positivity: 0.199,
//     negativity: 0.172,
//     neutrality: 0.629,
//     compound: 0.5524,
//     label: 'POSITIVE',
//   },
//   {
//     user: 'Jacob Overmark',
//     text: 'I run a zero-tolerance, almost fascistic, kitchen regime.So much that my better half jokingly have referred to herself as "The Kitchen God´s Wife", though with no resemblance at all to the Chinese myth.This is also the reason the novel is on my shelve.I admit I have been reluctant to enter into the universe of Amy Tan, and it turns out with good reason. It is probably a nice book to pick from Oprah Winfrey´s Book Club if you are of Chinese/American descent and have strained family relationships - otherwise you will hardly be able to relate. Despite all the "praise" it is nothing but a chick-literary lightweighter.  ',
//     rating: '2',
//     positivity: 0.083,
//     negativity: 0.046,
//     neutrality: 0.871,
//     compound: 0.4404,
//     label: 'POSITIVE',
//   },
//   {
//     user: 'Carolyn F.',
//     text: "I read this book years ago (okay decades). As with the other books I've read by this author, a lot of untold sorrows with a sort of redemption at the end. Good book.",
//     rating: '4',
//     positivity: 0.087,
//     negativity: 0.078,
//     neutrality: 0.836,
//     compound: 0.0772,
//     label: 'POSITIVE',
//   },
//   {
//     user: 'Magrat Ajostiernos',
//     text: '3,5/5Esta novela habla de maltrato en el marco de la China previa y posterior a la Segunda Guerra Mundial. Vamos a ver todo tipo de acontecimientos históricos que van a pasar por la protagonista a veces con mayor y otras con menor peso, pero una vez más Amy Tan habla más de personajes que de hechos, y nos muestra la fortaleza de una mujer que debe sobrevivir ante todo tipo de adversidades, siendo la primera y la peor de ellas su propio marido.Me gustó mucho la manera en que narra la historia, contándosela por fin a su hija y haciendo de esta manera las paces con ella, aprendiendo a confiar. Esto hace que la historia sea muy sencilla y directa, plagada de anécdotas y expresiones cotidianas, sin ningún tipo de dramatismo y pasando de puntillas por los momentos más amargos de su vida.De la misma manera eso hace que para mi haya sido una historia un poco fría con la que no he acabado de "meterme".Y de todas maneras me ha gustado y he aprendido con ella, como siempre me pasa con Amy Tan ♥︎',
//     rating: '3',
//     positivity: 0.014,
//     negativity: 0.033,
//     neutrality: 0.953,
//     compound: -0.5267,
//     label: 'NEGATIVE',
//   },
//   {
//     user: 'Carla',
//     text: "I thought I had read this book many years ago, but knew that if I had, I would notice right away. I guess I didn't read it! What an wonderful story. A story of secrets held for many many years. Of a Mother and daughter from not only different generations, but cultures and continents. I find the stories of new immigrants and their American born children fascinating. Particularly when the immigrants life in their home country was impoverished, abusive, and horrifying particularly due to war. There is then such a huge gap between the parents and children, and lack of understanding, unless stories are shared. The threat given, of secrets being exposed, sets the story up for a history that the mother shares with her daughter. It's never too late to reveal how your history impacted on who you are today. ",
//     rating: '5',
//     positivity: 0.114,
//     negativity: 0.158,
//     neutrality: 0.728,
//     compound: -0.8496,
//     label: 'NEGATIVE',
//   },
//   {
//     user: 'Deacon Tom F',
//     text: 'I was very disappointed with this book. It starts out very very well with a great mother daughter relationship story but soon moves into the story of Winnie’s life which gets very boring and at times even difficult to read.I was very disappointed',
//     rating: '2',
//     positivity: 0.085,
//     negativity: 0.254,
//     neutrality: 0.661,
//     compound: -0.8723,
//     label: 'NEGATIVE',
//   },
//   {
//     user: 'Mariah Roze',
//     text: "I read this book for the Goodreads' Book Club: Diversity in All Forms! If you'd like to join the discussion here is the link: https://www.goodreads.com/topic/show/...This book is an extremely short read. I read it in less than 24 hours while working and going to school. The story takes a huge turn when Winnie shares what her life was like in China. This is a sad, but eye-opening story that is definitely realistic fiction!\"Winnie and Helen have kept each other's worst secrets for more than fifty years. Now, because she believes she is dying, Helen wants to expose everything. And Winnie angrily determines that she must be the one to tell her daughter, Pearl, about the past—including the terrible truth even Helen does not know. And so begins Winnie's story of her life on a small island outside Shanghai in the 1920s, and other places in China during World War II, and traces the happy and desperate events that led to Winnie's coming to America in 1949.\"",
//     rating: '4',
//     positivity: 0.104,
//     negativity: 0.137,
//     neutrality: 0.759,
//     compound: -0.8869,
//     label: 'NEGATIVE',
//   },
//   {
//     user: 'Repellent Boy',
//     text: 'Winnie y su hija Pearl no terminan de entenderse. El hecho de que una sea una mujer china que emigró a Estados Unidos, y la otra, pese a sus ascendencia china, haya nacido como americana, crea un choque cultural que tensa la relación de ambas y las mantiene separadas. La tía de Pearl, Helen, siempre esta cerca de su madre Winnie, y aunque a veces no parece que tengan buena relación, la realidad es que llevan toda la vida juntas. La enfermedad de Helen dará el pistoletazo de salida a esta cruda historia, y es que ante el miedo de morir llena de secretos, Helen convence a Winnie para que cuenten todo lo que llevan callando más de 40 años, todo lo que Pearl nunca supo de la vida de su madre.Hace años leí “El club de la buena estrella” y se convirtió instantáneamente en un favorito. Me fascinó ese choque cultural entre esas cuatro madres chinas con sus cuatro hijas americanas, me enterneció y me tocó la fibra a muchos niveles. Esas madres que tratan de entender a sus hijas en un mundo que les resulta extraño, que rechaza sus tradiciones y su cultura, y unas hijas que se encuentran inmersas en medio de dos culturas tan opuestas, sin saber a donde pertenecen. Ha sido una alegría descubrir que bajo diferentes historias y formas, el tema fetiche de Amy Tan sigue siendo el mismo, pues, además de muchas otras cosas, “La esposa del dios fuego” toma como punto de partida esta falta de entendimiento entre madre e hija, y traza la senda a seguir para que puedan encontrarse en el camino.Mientras Winnie va contándonos su historia el lector puede ir descubriendo mucho del contexto histórico chino de la época. La historia de Winnie abarca desde principios de los años 20 en una Shanghai moderna y rica, lugar donde Winnie nace en una acomodada familia, hasta finales de los años cuarenta. Durante estos años, China asiste a muchos cambios, los japoneses invaden China y todo se pone patas arriba, pero los años pasan y los japoneses no serán el único peligro de China, ya que la batalla entre el Kuomintang y los comunistas se ha ido fraguando poco a poco. China encadena un año tras otro de grandes desequilibrios, guerras, hambrunas y pobreza, y bajo todo este contexto asistiremos a la vida Winnie.Winnie es obligada a casarse con Wen Fu, que no exagero si os digo que se ha convertido en uno de los personajes más repulsivos que he leído en mi vida. Repulsivos a niveles en los que me hubiera gustado meterme dentro del libro y arrancarle la cabeza. Sin embargo, me gusta mucho la construcción del personaje y como Amy Tan sabe presentarlo como un caballero tierno y atento, un gran conquistador, que solo revela su personalidad real cuando tiene atrapada a su presa. Un retrato muy acertado de la figura del maltratador. También he detestado al marido occidental de Pearl, ya en la actualidad de la novela (los noventa), porque constantemente ridiculiza la cultura de su suegra, haciéndola de menos, mientras su hija lo permite. Por otra parte, me ha gustado mucho la propia Winnie, que pese a haber tenido una vida dura, es un personaje que se recompone y que sale adelante con una fortaleza inagotable. Creo que “La esposa del dios fuego” es de esos libros que enseñan mucho, no solo en cuanto a contexto histórico, sino culturalmente hablando, en cuanto a tradiciones y costumbres propias del día a día, y sobre como se relacionan las personas. He disfrutado mucho de la relación de Helen y Winnie, esa amistad que siempre pendía de un hilo, pero que conseguía salir a flote a base de esas costumbres tan interiorizadas sobre como tratar o agradar al otro. También me ha impactado mucho como sus personajes tienden a relativizar grandes desgracias, no permitiéndose caer nunca ante el dolor de la muerte de ningún ser querido. Es algo que me he encontrado mucho en la literatura china, e imagino que es fruto de todo ese desequilibrio que el país ha experimentado en el último siglo, de continuas guerras, donde seguir adelante era la única posibilidad, pasara lo que pasara.Es un libro duro y crudo, que pese a no relamerse con escenas traumáticas muy explícitas, sí que las muestra sin temor y eso a veces desgarra un poco. Hacía mucho tiempo que no leía Amy Tan, pero ha sido un gustazo reencontrarme con ella. Encuentro en sus historias, pese al drama que las caracteriza, un sitio seguro, de historias sobre mujeres fuertes, de aprendizaje y de denuncia. Me despiertan los mismos sentimientos que la obra de Lisa See. Espero que nuestro próximo encuentro no tarde en llegar.',
//     rating: '4',
//     positivity: 0.022,
//     negativity: 0.046,
//     neutrality: 0.932,
//     compound: -0.9552,
//     label: 'NEGATIVE',
//   },
//   {
//     user: 'Tracy',
//     text: "Make it stop! The first quarter of the book was okay, though I was waiting for something to actually make me care. It was a story about family and secrets and interaction - but then the interaction stopped and with no segue a woman is talking about her history and the abuse she endured and war and infant mortality... it's not clear if she's having 'an episode', if she's talking TO someone, or what.I began forwarding through random (long) chunks to try to get past this depressing and (so far) pointless wander down the lane of memories not happy - but it seemed to never stop! Past the halfway point of the (abridged) book, I finally had had enough. I'm sure someone is enlightened or enriched or empowered by this kind of story. It sure ain't me. ",
//     rating: '1',
//     positivity: 0.084,
//     negativity: 0.197,
//     neutrality: 0.719,
//     compound: -0.9653,
//     label: 'NEGATIVE',
//   },
//   {
//     user: 'Dona',
//     text: "I found my audiobook copy of THE KITCHEN GOD'S WIFE by Amy Tan on Scrib'd!Winnie has finally reached a point in her life when she must come clean with her daughter about who she was before she became a refugee sum American and a mother. Such secrets she has always hidden, professed to protect her daughter. More likely, she also needed to protect herself. Some history, war history, cannot be scrubbed clean with the voice, cannot be made fresh by airing out. But her history was not hers alone, still is not. Someone with whom she shares the story is ready to tell it. And so she must as well, at least to her own daughter.This book is mostly comprised of the memories Winnie shares of her life in various locales in China during WWII. She shares about a life of unbelievable hardship-- a horribly abusive husband who beat and raped her, harmed their children, wasted away their money and left them in abject poverty, and all the while demanded the utmost deference and subservience from her. She could get no help from her community, which was deeply mistrustful and judgmental of women. And during it all, she exercised astounding patience and cleverness, just waiting for her opportunity at freedom.For me, this was a challenging book to listen to, as Winnie endured many horrible things. She was trapped from every direction, I felt desperate on her behalf at many points in the story. Please accept this as my trigger warning for extreme instances of physical, emotional, and sexual violence against women and children, and loss of fetus. This is a truly heartbreaking story, and also an inspiring story of what one woman is able to suffer in silence, waiting for her moment, so she might escape to a better life.THE KITCHEN GOD'S WIFE is my first book from Amy Tan but I'm looking forward to reading many more books from her.Rating: 🎫🎫🎫🎫 / 5 stolen plane ticketsRecommend? Absolutely!Finished: April 5 2023Read this if you like:🏠 Domestic drama🏘 Small town stories🕰 Historical fiction 🌄 Redemption stories ✈️ Refugee stories👩 Diverse authors and stories",
//     rating: '5',
//     positivity: 0.152,
//     negativity: 0.174,
//     neutrality: 0.674,
//     compound: -0.9679,
//     label: 'NEGATIVE',
//   },
//   {
//     user: 'Bloodorange',
//     text: "I officially do not want to read anything by Tan again. At least this is how I feel at the moment.Why the three stars: The Kitchen God's Wife is very well written, but I hated what this book was doing to me. The WWII in China is merely a backdrop for the protagonist's personal drama of epic proportions; suffice to say that when something very bad, but not exactly cruel, happened (one of protagonist's children dies, quite straightforwardly, of plague), I felt relief.Winnie (the protagonist's new, American name) was married to a psychopath. Throughout the book, she has to cope with humiliation, degradation, and a plethora of personal tragedies : she is repeatedly, regularly raped, humiliated by her husband in private and in front of their friends, loses children because of her husband's violence and cruelty - directly and indirectly. This is, I think, a book about comradeship and despair, loss and strength; but if you do not bear reading about serious abuse too well, consider skipping this one.",
//     rating: '3',
//     positivity: 0.08,
//     negativity: 0.286,
//     neutrality: 0.634,
//     compound: -0.9939,
//     label: 'NEGATIVE',
//   },
//   {
//     user: 'luce (in the doldrums & very behind reviews)',
//     text: "| |  blog |  tumblr | ko-fi | |For a book published in the 90s The Kitchen God's Wife comes across as strangely outdated. And I guess in spite of Tan's writing—which is far from mediocre or incompetent—I could not look past the fact that her story was the antithesis of female solidarity.At first I was taken by Tan's storytelling. The first 40 pages or so, those that take place in the 'present', were enjoyable. We learn that Pearl, a woman in her thirties, has always had a difficult relationship with Winnie, her mother. Some of this is due to generational and cultural differences but, as we soon learn, both mother and daughter have kept secrets from each other. When Winnie's sister-in-law Helen/Hulan announces that she can no longer keep silent about their past, Winnie is forced to recount her many trials and hardships to her daughter. This is where the novel lost me. I find this kind of cheesy melodrama meets misery porn to be exceedingly frustrating. Winnie is basically Cinderella or the classic Mary Sue: 99% of people around her use her and abuse her. Every female character, with the exception of Grand Auntie Du, is cruel, vain, stupid, ugly, and or ungrateful. Winnie, on the other hand, is an angel. She is not like other girls. She endures and she suffers because she has aspirations to martyrdom.Given that she is recounting past experiences directly—ie we get a 1st pov—you would think that at one point or another Winnie could express uncertainty over the accuracy of her memories or wonder if others recall things differently. But no! She keeps insisting that 'this is what happened' and that Helen is a liar who remembers things wrong. And, speaking of Helen, rather than painting a complex and fraught friendship, Tan presents us with the goody two shoes Winnie and the ugly, stupid, and venal Helen who is not only a horrible friend to Winnie but a lousy human being.Anyway, Winnie recounts her tragic past: her mother abandons her, she is shunned by her wealthy father and raised by cartoonishly wicked relatives. In relating these experiences Winnie alway makes a point of emphasising her inherent goodness and beauty, often by making little digs about women's failings. Winnie ends up marrying a horrible man who possess only vices. Her reminded me of the 'bad' men from The Giver of Stars and novels by Kristin Hannah. Personally, I prefer more nuanced characters. Tan also often conflates a characters' physical appearance with their personality—so if one has an ugly character they will be indeed 'ugly' on the outside—which feels a tad...old-fashioned? Maybe it would be more suited to a novel dated from the 19th century than the 1990s.The only sections that were somewhat interesting and whinging-free were the ones that stuck to facts. For example, when Tan writes details statics and about the Sino-Japanese War (as opposed to Winnie's own experiences in it). When she writes of Nanking I felt much more horrified and moved than I was by anything related to Winnie.Sadly, Winnie's narrative is more intent on dissing on Helen than anything else. Here are some the lovely things she says/thinks about Helen: “Her mouth dropped open to let this thought come in and nourish her brain. I was thinking, Good, even though she is uneducated, she is quick to learn something new.” / “She was plump, but not in that classical way of a peach whose pink skin is nearly bursting with sweetness. Her plumpness was round and overflowing in uneven spots, more like a steamed dumpling with too much filling leaking out of the sides. She had thick ankles and large hands, and feet as broad as boat paddles. ” / her hair was “lumpy” / she had no sense of fashion, none at all.” / “a simple country girl”.And Winnie goes on to tell Pearl that: “I am not being critical in remembering her features just because I am angry with her now”. Sure hon, go on and keep lying to yourself. Winnie never takes any responsibility. Everything is and or always was all Helen's fault. Helen is ugly inside and out, “she broke harmony between us. I tell you, that day Hulan showed me her true character. She was not the soft melon head she made everyone believe she was. That girl could throw out sharp words, slicing fast as any knife”. And of course, “She’s the complaining one, not I”. I'm not so sure about that one Winnie...the story ended up being less about domestic abuse, war, and survival, then a woman going on and on about how her 'supposed' friend is a trash human being.I swear, every few pages, Winnie would say something such as: “Who is the better cook? You see! I am not boasting. It’s true. ” / “You know what I think? When Jiaguo got his promotion, Hulan gave herself a promotion too! In her mind, she was more important than I was. ” / “She was always unhappy until I was the same level of unhappy as she was.” / “You would think Hulan would remember those hard little cakes, and then put a few coins, or maybe some food, into the beggar girl’s bowl, which is what I did. I’m not saying I did this all the time. But Hulan did not do this even once. Instead she put more food into her own mouth. She added fat onto her body the same way a person saves gold or puts money into a bank account, something she could use if worse came to worst.” / “So you see, I think it was some little river crabs Hulan wanted to eat in Changsha. That’s what made us sick. It stayed in our bodies and broke out one day.” / “She will probably tell you it was instant true love. Maybe for him. But I think she was being practical”....and I cannot stand this lousy portrayal of female 'friendship'. Women, with the exception of Winnie, are catty and fake. Men, with the exception of Winnie's Chinese-American second husband—are stupid, cowardly, or abusive sadists.Other girls Winnie encounters also receive a similar treatment to Helen's one. Winnie sometimes pretends to be nice (claiming that she didn't hate a woman before stressing how selfish or unkind that woman was) but, in actuality, she is anything but. She describes a girl she dismisses as “stuck-up” as having “red as a demon’s” eyes. Her first husband's new wife is not only “bossy” in both attitude and appearance but “stupid” (“You see how stupid his new wife was?”). Winnie also makes some weird comments about Burmese and Cantonese people, seems to relish the idea that Peanut, yet another cruel/vain girl, “who used to pride herself on the paleness of her skin. And now she was almost as dark as a Cantonese!”. And yes, sure, Winnie suffers. Her husband is a monster with no redeeming qualities and with the exception of Grand Auntie Du and her American-born husband...well, everyone else is bad news.I dislike this kind of 'girl-on-girl hate' and the whole Winnie=Cinderella thing was annoying.Thankfully, I bought my copy of this book in a second-hand shop (then again, I will never get back the hours I spent reading this). While I wouldn't recommend this novel to anyone in particular I'm aware that Tan is an extremely popular writer so....maybe it's just me.",
//     rating: '2',
//     positivity: 0.085,
//     negativity: 0.178,
//     neutrality: 0.736,
//     compound: -0.9993,
//     label: 'NEGATIVE',
//   },
// ];

// const testRating = 4;

export default function Book() {
  const { bookId } = useParams();
  const uuid = useId();

  const { isAuthenticated } = useAuthStore();

  const [book, setBook] = useState<IBook>();
  const [recommendations, setRecommendations] = useState<IBook[]>([]);
  const [loadingBook, setLoadingBook] = useState(false);
  const [reviews, setReviews] = useState<IBookReview[]>([]);
  const [review, setReview] = useState<IBookReview>();
  const [rating, setRating] = useState(0);

  const [reviewError, setReviewError] = useState<string>();
  const [fetchingReview, setFetchingReview] = useState(false);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isReveiw,
    onClose: onCloseReview,
    onOpen: onOpenReview,
  } = useDisclosure();
  const columnCount = useBreakpointValue({ base: 2, md: 3, lg: 4 });

  const openReveiwHandler = (review: IBookReview) => {
    setReview(review);
    onOpenReview();
  };

  const closeReveiwHandler = () => {
    setReview(undefined);
    onCloseReview();
  };

  const setDefaultReview = () => {
    setReviews([]);
    setRating(0);
  };

  useEffect(() => {
    const fetchBook = async () => {
      if (!bookId) return;
      setLoadingBook(true);
      try {
        const { data } = await API.bookAPI.findBookById(bookId);
        const { data: recommendations } = await API.bookAPI.getRecommendation(
          data.isbn
        );

        setBook(data);
        setRecommendations(recommendations);
      } catch (error) {
        setBook({} as IBook);
        setRecommendations([]);
      } finally {
        setLoadingBook(false);
      }
    };

    fetchBook();
  }, [bookId]);

  useEffect(() => {
    const fetchReview = async () => {
      setFetchingReview(true);
      setReviewError(undefined);

      try {
        if (!bookId) {
          setDefaultReview();
          setFetchingReview(false);
          return;
        }
        setFetchingReview(true);

        const { data } = await API.bookAPI.getBookReviews(bookId);

        if (!data) {
          setDefaultReview();
        }

        setReviews(data.reviews);
        setRating(data.rating);
      } catch (err) {
        setReviews([]);
        setRating(0);
        const error = err as Error | AxiosError;

        if (axios.isAxiosError(error)) {
          setReviewError(error.response?.data?.message || 'An error occurred');
        } else {
          setReviewError(error.message);
        }
      } finally {
        setFetchingReview(false);
      }
    };

    fetchReview();
  }, [bookId]);

  if (loadingBook && fetchingReview) return <Loading />;

  return (
    <Container maxW="100%" px={10} py={8}>
      <VStack spacing={8} w="100%">
        <Heading textAlign={'center'} mb="4">
          {book?.title}
        </Heading>
        <Text as="p" textAlign={'center'}>
          {book?.author}, {book?.year_of_publication}
        </Text>

        {!reviewError && rating && (
          <Flex w="100%" justifyContent="center" alignItems={'center'}>
            <Rating code="page" length={rating} />
          </Flex>
        )}

        <Stack direction={['column', 'column', 'column', 'row']} spacing={8}>
          <Box w={['100%', '100%', '100%', '50%']}>
            <VStack
              spacing={6}
              position="sticky"
              top="5"
              zIndex="sticky"
              overflow={'auto'}
            >
              <Button
                display={isAuthenticated ? 'block' : 'none'}
                onClick={onOpen}
                colorScheme="facebook"
              >
                add to bookshelf
              </Button>
              <Image src={book?.image_url_l} alt={book?.title} />
              <Flex
                gap="4"
                wrap="wrap"
                justifyContent="center"
                alignItems="center"
              >
                {book?.genres?.map((tag, i) => (
                  <Tag key={uuid + book.id + i}>{tag}</Tag>
                ))}
              </Flex>
              <Text as="p" textAlign={'center'}>
                {book?.description}
              </Text>
            </VStack>
          </Box>

          <VStack spacing={6} w={['100%', '100%', '100%', '50%']}>
            <Text as="h3" textAlign={'center'}>
              Book Recommendations
            </Text>
            <Grid
              w="100%"
              templateColumns={[
                'repeat(1, 1fr)',
                'repeat(2, 1fr)',
                'repeat(3, 1fr)',
                'repeat(2, 1fr)',
              ]}
              gap={6}
            >
              {recommendations?.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </Grid>
          </VStack>
        </Stack>

        <Text as="h3" textAlign={'center'}>
          Book Reviews
        </Text>

        {reviewError ? (
          <Text color="red.500">{reviewError}</Text>
        ) : reviews.length ? (
          <Grid templateColumns={`repeat(${columnCount}, 1fr)`} gap={4}>
            {reviews.map((review, idx) => (
              <BookReviewCard
                key={idx}
                review={review}
                onReview={openReveiwHandler}
              />
            ))}
          </Grid>
        ) : (
          <Text as="p" textAlign={'center'}>
            No reviews yet
          </Text>
        )}
      </VStack>

      <AddBookModal
        isOpen={isOpen}
        onClose={onClose}
        onHandleSubmit={() => {
          onClose();
        }}
      />

      {review && (
        <BookReviewModal
          review={review}
          isOpen={isReveiw}
          onClose={closeReveiwHandler}
        />
      )}
    </Container>
  );
}

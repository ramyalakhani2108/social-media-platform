-- Sample Users
INSERT INTO users (id, email, username, password_hash, is_admin, is_verified)
VALUES 
    ('123e4567-e89b-12d3-a456-426614174000', 'admin@example.com', 'admin', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', true, true),
    ('123e4567-e89b-12d3-a456-426614174001', 'user1@example.com', 'user1', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', false, true),
    ('123e4567-e89b-12d3-a456-426614174002', 'user2@example.com', 'user2', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', false, true);

-- Sample Posts
INSERT INTO posts (id, user_id, content, media_url, likes_count, comments_count)
VALUES 
    ('123e4567-e89b-12d3-a456-426614174003', '123e4567-e89b-12d3-a456-426614174001', 'Check out my new post!', 'https://example.com/image1.jpg', 5, 3),
    ('123e4567-e89b-12d3-a456-426614174004', '123e4567-e89b-12d3-a456-426614174002', 'Amazing day at the beach!', 'https://example.com/image2.jpg', 8, 2);

-- Sample Comments
INSERT INTO comments (id, post_id, user_id, content)
VALUES 
    ('123e4567-e89b-12d3-a456-426614174005', '123e4567-e89b-12d3-a456-426614174003', '123e4567-e89b-12d3-a456-426614174002', 'Great post!'),
    ('123e4567-e89b-12d3-a456-426614174006', '123e4567-e89b-12d3-a456-426614174003', '123e4567-e89b-12d3-a456-426614174001', 'Love the photo!'),
    ('123e4567-e89b-12d3-a456-426614174007', '123e4567-e89b-12d3-a456-426614174004', '123e4567-e89b-12d3-a456-426614174001', 'Beautiful!');

-- Sample Likes
INSERT INTO likes (id, post_id, user_id)
VALUES 
    ('123e4567-e89b-12d3-a456-426614174008', '123e4567-e89b-12d3-a456-426614174003', '123e4567-e89b-12d3-a456-426614174002'),
    ('123e4567-e89b-12d3-a456-426614174009', '123e4567-e89b-12d3-a456-426614174004', '123e4567-e89b-12d3-a456-426614174001'),
    ('123e4567-e89b-12d3-a456-426614174010', '123e4567-e89b-12d3-a456-426614174003', '123e4567-e89b-12d3-a456-426614174001');

-- Sample Followers
INSERT INTO followers (id, follower_id, following_id)
VALUES 
    ('123e4567-e89b-12d3-a456-426614174011', '123e4567-e89b-12d3-a456-426614174001', '123e4567-e89b-12d3-a456-426614174002'),
    ('123e4567-e89b-12d3-a456-426614174012', '123e4567-e89b-12d3-a456-426614174002', '123e4567-e89b-12d3-a456-426614174001');

-- Sample Messages
INSERT INTO messages (id, sender_id, receiver_id, content, is_read)
VALUES 
    ('123e4567-e89b-12d3-a456-426614174013', '123e4567-e89b-12d3-a456-426614174001', '123e4567-e89b-12d3-a456-426614174002', 'Hi there!', false),
    ('123e4567-e89b-12d3-a456-426614174014', '123e4567-e89b-12d3-a456-426614174002', '123e4567-e89b-12d3-a456-426614174001', 'Hello!', true);

-- Sample Stories
INSERT INTO stories (id, user_id, content, media_url, expires_at)
VALUES 
    ('123e4567-e89b-12d3-a456-426614174015', '123e4567-e89b-12d3-a456-426614174001', 'My story!', 'https://example.com/story1.jpg', NOW() + interval '24 hours'),
    ('123e4567-e89b-12d3-a456-426614174016', '123e4567-e89b-12d3-a456-426614174002', 'Fun day!', 'https://example.com/story2.jpg', NOW() + interval '24 hours');

-- Sample Reels
INSERT INTO reels (id, user_id, content, media_url, likes_count, comments_count)
VALUES 
    ('123e4567-e89b-12d3-a456-426614174017', '123e4567-e89b-12d3-a456-426614174001', 'My first reel!', 'https://example.com/reel1.mp4', 10, 5),
    ('123e4567-e89b-12d3-a456-426614174018', '123e4567-e89b-12d3-a456-426614174002', 'Dance reel', 'https://example.com/reel2.mp4', 15, 3);

-- Sample Chatbot Messages
INSERT INTO chatbot_messages (id, user_id, content)
VALUES 
    ('123e4567-e89b-12d3-a456-426614174019', '123e4567-e89b-12d3-a456-426614174001', 'Hi chatbot!'),
    ('123e4567-e89b-12d3-a456-426614174020', '123e4567-e89b-12d3-a456-426614174002', 'What can you do?');

-- Sample Event Stream
INSERT INTO event_stream (id, event_type, event_data, metadata, partition_key)
VALUES 
    ('123e4567-e89b-12d3-a456-426614174021', 'USER_SIGNUP', '{"email": "user1@example.com", "username": "user1"}', '{}', 'user1@example.com'),
    ('123e4567-e89b-12d3-a456-426614174022', 'POST_CREATE', '{"postId": "123e4567-e89b-12d3-a456-426614174003", "userId": "123e4567-e89b-12d3-a456-426614174001"}', '{}', '123e4567-e89b-12d3-a456-426614174003');

-- Sample Cache Keys
INSERT INTO cache_keys (id, key_name, ttl)
VALUES 
    ('123e4567-e89b-12d3-a456-426614174023', 'user:123e4567-e89b-12d3-a456-426614174001', 3600),
    ('123e4567-e89b-12d3-a456-426614174024', 'post:123e4567-e89b-12d3-a456-426614174003', 3600);

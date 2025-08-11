/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Missing email or password
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phone
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [adopters, shelter_manager, shelter_staff, admin]
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *       400:
 *         description: Validation error (missing or invalid fields)
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout the current user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful, refresh token removed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       204:
 *         description: No refresh token found in cookie
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token using refresh token in cookie
 *     tags: [Users]
 *     description: Generates a new access token if the refresh token in cookie is valid.
 *     responses:
 *       200:
 *         description: New access token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: No refresh token provided in cookie
 *       403:
 *         description: Invalid or expired refresh token
 */

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get current user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *                     role:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *                     shelter_id:
 *                       type: string
 *       401:
 *         description: Unauthorized - missing or invalid access token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/updateProfile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile updated successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/changePassword:
 *   put:
 *     summary: Change user password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password changed successfully
 *       400:
 *         description: Old password is incorrect
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Login with Google
 *     tags: [Users]
 *     description: Initiates Google OAuth2 login flow.
 *     responses:
 *       302:
 *         description: Redirect to Google login page
 */

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth2 callback
 *     tags: [Users]
 *     description: Handles Google login response and redirects to app if successful.
 *     responses:
 *       302:
 *         description: Redirects to app page on success or login page on failure
 */

/**
 * @swagger
 * tags:
 *   name: Shelters
 *   description: Shelter management
 */


/**
 * @swagger
 * /auth/registerShelter:
 *   post:
 *     summary: Register a new shelter
 *     tags: [Shelters]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyName
 *               - companyEmail
 *               - phone
 *               - address
 *               - business_license
 *             properties:
 *               companyName:
 *                 type: string
 *               companyEmail:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               business_license:
 *                 type: string
 *     responses:
 *       201:
 *         description: Shelter registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 shelter:
 *                   type: object
 *                   properties:
 *                     companyEmail:
 *                       type: string
 *       400:
 *         description: Invalid request body
 *       409:
 *         description: Shelter already exists
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/createStaff:
 *   post:
 *     summary: Create a shelter staff account
 *     tags: [Shelters]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phone
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Shelter staff registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *       400:
 *         description: Invalid input
 *       409:
 *         description: User already exists
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Get all pets with optional filters and pagination
 *     tags: [Pets]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           example: Mèo
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           example: Cái
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           example: Có sẵn
 *       - in: query
 *         name: size
 *         schema:
 *           type: string
 *           example: Nhỏ
 *       - in: query
 *         name: fur
 *         schema:
 *           type: string
 *           example: Dài
 *       - in: query
 *         name: personality
 *         schema:
 *           type: string
 *           example: Thân thiện
 *       - in: query
 *         name: vaccinated
 *         schema:
 *           type: boolean
 *           example: true
 *       - in: query
 *         name: child_friendly
 *         schema:
 *           type: boolean
 *           example: false
 *       - in: query
 *         name: minAge
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: maxAge
 *         schema:
 *           type: integer
 *           example: 5
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 6
 *     responses:
 *       200:
 *         description: List of pets retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pet'
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /pets:
 *   post:
 *     summary: Create a new pet
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - age
 *               - gender
 *               - status
 *               - price
 *               - health_condition
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [Chó, Mèo, Chim]
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *                 enum: [Đực, Cái, Khác]
 *               status:
 *                 type: string
 *                 enum: [Có sẵn, Đã nhận nuôi, Đang nuôi dưỡng]
 *               price:
 *                 type: number
 *               vaccinated:
 *                 type: boolean
 *               health_condition:
 *                 type: string
 *               child_friendly:
 *                 type: boolean
 *               size:
 *                 type: string
 *                 enum: [Nhỏ, Vừa, Lớn]
 *               fur:
 *                 type: string
 *                 enum: [Ngắn, Vừa, Dài]
 *               personality:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pet created successfully
 *       400:
 *         description: Invalid request body or validation error
 *       401:
 *         description: Unauthorized - missing token
 */

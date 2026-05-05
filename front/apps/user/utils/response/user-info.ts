// mirrors: com.back.user.model.dto.response.UserInfo  (@JsonInclude NON_NULL → all fields optional)
export interface UserInfo {
  id?:               number;
  username?:         string;
  nickname?:         string;
  email?:            string;
  bio?:              string;
  avatarUrl?:        string;
  coverUrl?:         string;
  followersCount?:   number;
  followingCount?:   number;
  totalLikes?:       number;
  videoCount?:       number;
  verified?:         boolean;
  isPrivate?:        boolean;
  /** UserStatus enum value as string */
  status?:           string;
  /** AccountType enum value as string */
  accountType?:      string;
  websiteUrl?:       string;
  instagramHandle?:  string;
  youtubeHandle?:    string;
  /** Gender enum value as string */
  gender?:           string;
  region?:           string;
  /** ISO date string, e.g. "1999-07-15" */
  dateOfBirth?:      string;
  privacySettings?:  PrivacySettings;
  relationship?:     RelationshipStatus;
  /** RoleName enum values, e.g. ["ROLE_USER"] */
  roles?:            string[];
  /** ISO datetime string */
  createdAt?:        string;
}

// mirrors: UserInfo.PrivacySettings static inner class
export interface PrivacySettings {
  allowComments?:            boolean;
  allowDuet?:                boolean;
  allowStitch?:              boolean;
  allowDownload?:            boolean;
  allowMessageFromEveryone?: boolean;
  commentFilter?:            string;
  messagePrivacy?:           string;
}

// mirrors: UserInfo.RelationshipStatus static inner class
export interface RelationshipStatus {
  isFollowing?: boolean;
  isFollower?:  boolean;
  isBlocked?:   boolean;
  isFriend?:    boolean;
}

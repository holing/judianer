create database judianer;
  use judianer;
	create table Party(
		partyID int primary key auto_increment,
		partyName varchar(100) not null,
		partyAddr varchar(200) not null,
		partyDate date not null,
		createDate date not null,
		createUser varchar(30) not null
		);

	create table User(
		userID int primary key auto_increment,
		username varchar(30) not null,
		partyID int not null,
		joinparty enum('1','2','4') not null,
		mark text
		);

	
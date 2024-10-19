"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Instagram, Linkedin, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const MAX_ATTEMPTS = 6;

const CATEGORIES = {
    animals: [
      { word: "elephant", hint: "Large mammal with a trunk" },
      { word: "giraffe", hint: "Tall African animal with a long neck" },
      { word: "penguin", hint: "Flightless bird that swims" },
      { word: "kangaroo", hint: "Australian marsupial that hops" },
      { word: "octopus", hint: "Sea creature with eight arms" },
    ],
    countries: [
      { word: "brazil", hint: "Largest country in South America" },
      { word: "japan", hint: "Island nation known for sushi and anime" },
      { word: "australia", hint: "Continent and country down under" },
      { word: "egypt", hint: "Home of the pyramids" },
      { word: "canada", hint: "Second largest country by land area" },
    ],
    movies: [
      { word: "inception", hint: "Dream within a dream" },
      { word: "avatar", hint: "Blue aliens on Pandora" },
      { word: "titanic", hint: "Ill-fated ship romance" },
      { word: "jaws", hint: "Killer shark thriller" },
      { word: "frozen", hint: "Let it go, let it go" },
    ],
  };
  
  // Use keyof typeof CATEGORIES to ensure category is one of the defined keys
  type CategoryKey = keyof typeof CATEGORIES;
  
  export default function EnhancedHangman() {
    const [category, setCategory] = useState<CategoryKey>("animals"); // <-- Specify type here
    const [word, setWord] = useState("");
    const [hint, setHint] = useState("");
    const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
    const [remainingAttempts, setRemainingAttempts] = useState(MAX_ATTEMPTS);
    const [input, setInput] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const { setTheme } = useTheme();
  
    useEffect(() => {
      newGame();
    }, []);
  
    const newGame = () => {
      // Generate random category and word
      const newCategory: CategoryKey = Object.keys(CATEGORIES)[
        Math.floor(Math.random() * Object.keys(CATEGORIES).length)
      ] as CategoryKey;  // <-- Cast to CategoryKey type
  
      const wordObj =
        CATEGORIES[newCategory][
          Math.floor(Math.random() * CATEGORIES[newCategory].length)
        ];
        
      setCategory(newCategory);
      setWord(wordObj.word);
      setHint(wordObj.hint);
      setGuessedLetters(new Set());
      setRemainingAttempts(MAX_ATTEMPTS);
      setGameOver(false);
      setWon(false);
    };

  const guessLetter = (letter: string) => {
    if (gameOver) return;

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter.toLowerCase());
    setGuessedLetters(newGuessedLetters);

    if (!word.includes(letter.toLowerCase())) {
      const newRemainingAttempts = remainingAttempts - 1;
      setRemainingAttempts(newRemainingAttempts);
      if (newRemainingAttempts === 0) {
        setGameOver(true);
      }
    } else if (word.split("").every((char) => newGuessedLetters.has(char))) {
      setGameOver(true);
      setWon(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.length === 1) {
      guessLetter(input);
      setInput("");
    }
  };

  const drawHangman = () => {
    const parts = [
      <circle key="head" cx="50" cy="25" r="10" />,
      <line key="body" x1="50" y1="35" x2="50" y2="70" />,
      <line key="arm1" x1="50" y1="50" x2="30" y2="40" />,
      <line key="arm2" x1="50" y1="50" x2="70" y2="40" />,
      <line key="leg1" x1="50" y1="70" x2="30" y2="90" />,
      <line key="leg2" x1="50" y1="70" x2="70" y2="90" />,
    ];
    return parts.slice(0, MAX_ATTEMPTS - remainingAttempts);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <nav className="flex justify-between items-center p-4 bg-secondary">
        <h1 className="text-2xl font-bold">Hangman</h1>
        <div className="flex items-center space-x-2">
          <a
            href="https://github.com/yusuf7861"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://instagram.com/siddique.raaj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary"
          >
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </a>
          <a
            href="www.linkedin.com/in/yusuf-jamal-449142173"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <User className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">About me</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>About Me</DialogTitle>
                <DialogDescription>
                    <div className="flex flex-col items-center space-y-4">
                    <Image
                      src="/images/apple-touch-icon.png"
                      alt="profile picture"
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                    <p>
                      Hello, I&apos;m <strong><em>Yusuf Jamal</em></strong>, a developer with a passion for turning ideas into functional and elegant digital experiences.
                    </p>
                    </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-card p-6 rounded-lg shadow-lg w-full max-w-md">
          <svg
            height="100"
            width="100"
            className="mb-4 mx-auto stroke-foreground"
          >
            <line x1="0" y1="99" x2="100" y2="99" />
            <line x1="20" y1="99" x2="20" y2="0" />
            <line x1="20" y1="0" x2="50" y2="0" />
            <line x1="50" y1="0" x2="50" y2="15" />
            {drawHangman()}
          </svg>

          <p className="text-xl mb-2 text-center">
            Category:{" "}
            <span className="font-semibold capitalize">{category}</span>
          </p>

          <p className="text-sm mb-4 text-center text-muted-foreground">
            Hint: {hint}
          </p>

          <p className="text-2xl mb-4 text-center tracking-widest">
            {word.split("").map((char, index) => (
              <span key={index} className="inline-block w-8">
                {guessedLetters.has(char) ? char : "_"}
              </span>
            ))}
          </p>

          <form onSubmit={handleSubmit} className="mb-4">
            <Label htmlFor="letter-input">Guess a letter:</Label>
            <div className="flex mt-1">
              <Input
                id="letter-input"
                type="text"
                maxLength={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="mr-2"
                disabled={gameOver}
              />
              <Button type="submit" disabled={gameOver}>
                Guess
              </Button>
            </div>
          </form>

          <p className="text-lg mb-4">Attempts left: {remainingAttempts}</p>

          {gameOver && (
            <div className="text-center">
              <p className="text-xl mb-2">{won ? "You won!" : "Game Over!"}</p>
              <p className="mb-4">
                The word was: <span className="font-semibold">{word}</span>
              </p>
              <Button onClick={newGame}>New Game</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
